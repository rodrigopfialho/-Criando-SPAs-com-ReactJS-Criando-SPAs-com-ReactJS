import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import zod from 'zod'

import {HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, MinutesAmountInput, TaskInput} from './styles'
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60)
})

// interface NewCycleFormData {
//     task: string
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number
}

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([])
    
    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
          task: '',
          minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data)
        reset()
    }

    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput 
                        id="task" 
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />

                        <datalist id="task-suggestions">
                            <option value="Projetos"/>
                            <option value="Projetos 1"/>
                            <option value="Projetos 2"/>
                            <option value="Projetos 3"/>
                        </datalist>

                    <label htmlFor="minutesAmount">Durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                        />

                    <span>Minutos.</span>
                </FormContainer>
                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}