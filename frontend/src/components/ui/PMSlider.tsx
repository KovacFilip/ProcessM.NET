import { Label } from '@/components/ui/ShadCN/label';
import { Slider } from '@/components/ui/ShadCN/slider';
import React, { Dispatch } from 'react';

type PMSliderProps = {
    label: string;
    maxValue: number;
    changeValue: Dispatch<React.SetStateAction<number>>;
    value: number;
    step?: number;
    className?: string;
};

export const PMSlider: React.FC<PMSliderProps> = ({
    label,
    maxValue,
    changeValue,
    value,
    step = 1,
    className,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <Label>{label}</Label>
            <Slider
                defaultValue={[value]}
                onValueCommit={([val]) => changeValue(val)}
                max={maxValue}
                step={step}
                className={className}
            />
        </div>
    );
};
