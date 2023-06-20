import { Box, Step, Stepper } from '@mui/material';
import React, { useState } from 'react';
import { styles } from './styles';
import CustomStepLabel from '../../atoms/CustomStepLabel';
import ViewDietPlanDayHorizontal from '../ViewDietPlanDayHorizontal';
import { DietPlan } from '../../../util/dietPlans';

type ViewDietPlanHorizontalProps = {
    dietPlan: DietPlan;
};

function ViewDietPlanHorizontal({ dietPlan }: ViewDietPlanHorizontalProps) {
    const completedSteps: {
        [k: number]: boolean;
    } = {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
    };

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return (
        <Box>
            <Box sx={styles.pageWrapper}>
                <Box sx={styles.stepperWrapper}>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label + 'step'} completed={completedSteps[index]}>
                                <CustomStepLabel sx={{ cursor: 'pointer' }} color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </CustomStepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                {activeStep === 0 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="segunda" />}
                {activeStep === 1 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="terça" />}
                {activeStep === 2 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="quarta" />}
                {activeStep === 3 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="quinta" />}
                {activeStep === 4 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="sexta" />}
                {activeStep === 5 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="sábado" />}
                {activeStep === 6 && <ViewDietPlanDayHorizontal dietPlan={dietPlan.attributes} weekDay="domingo" />}
            </Box>
        </Box>
    );
}

export default ViewDietPlanHorizontal;
