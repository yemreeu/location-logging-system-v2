import { Inject, Injectable } from '@nestjs/common';
import { Step } from './steps/step';
import { PlaceLocationStep } from './steps/place-location.step';
import { CheckAreaAvailibilityStep } from './steps/check-area-availibility.step';
import { InsertLogStep } from './steps/insert-log.step';
import { Location } from '../../../entities';

@Injectable()
export class CreateLocationSaga {
  private steps: Step<Location, void>[] = [];
  private successfulSteps: Step<Location, void>[] = [];

  constructor(
    @Inject('place-location-step') step1: PlaceLocationStep,
    @Inject('check-area-availibity') step2: CheckAreaAvailibilityStep,
    @Inject('insert-log') step3: InsertLogStep,
  ) {
    this.steps = [step1, step2, step3];
  }

  async execute(location: Location) {
    for (let step of this.steps) {
      try {
        console.info(`Invoking: ${step.name} ...`);
        await step.invoke(location);
        this.successfulSteps.unshift(step);
      } catch (error) {
        console.error(`Failed Step: ${step.name} !!`);
        this.successfulSteps.forEach(async (s) => {
          console.info(`Rollbacking: ${s.name} ...`);
          await s.withCompenstation(location);
        });
        throw error;
      }
    }
    console.info('Location Creation Transaction ended successfuly');
  }
}