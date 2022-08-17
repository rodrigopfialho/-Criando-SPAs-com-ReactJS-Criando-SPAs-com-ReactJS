import { useContext } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { CyclesContext } from "../../../../contexts/CyclesContext";


import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewClycleForm() {
    const {activeCycle} = useContext(CyclesContext)
    const { register } = useFormContext()
    
    return (
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        disabled={!!activeCycle}
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projetos" />
                        <option value="Projetos 1" />
                        <option value="Projetos 2" />
                        <option value="Projetos 3" />
                    </datalist>

                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        disabled={!!activeCycle}
                        {...register('minutesAmount', { valueAsNumber: true })}
                    />

                    <span>Minutos.</span>
                </FormContainer>
    )
}