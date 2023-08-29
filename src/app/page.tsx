'use client'

import { Paper, TextField, Button } from '@mui/material'
import { useState, useEffect } from 'react'

export default function Home() {

  const [todo, settodo] = useState('')
  const [plans, setplans] = useState([] as string[])
  const [inProgress, setinProgress] = useState([] as string[])
  const [finished, setfinished] = useState([] as string[])

  useEffect(() => {
    const handleContextmenu = (e: MouseEvent) => {
        e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return (
      () => document.removeEventListener('contextmenu', handleContextmenu)
    )
  }, [])

  const todoHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settodo(e.target.value)
  }

  const addPlans = () => {
    if (todo !== ''){
      setplans(plans.concat(todo))
      settodo('')
    }
  }

  const removePlan = (index: number) => {
    setplans([...plans.slice(0, index), ...plans.slice(index + 1)])
  }

  const addInProgress = (index: number) => {
    setinProgress(inProgress.concat(plans[index]))
    setplans([...plans.slice(0, index), ...plans.slice(index + 1)])
  }

  const backToPlan = (index: number) => {
    setplans(plans.concat(inProgress[index]))
    setinProgress([...inProgress.slice(0, index), ...inProgress.slice(index + 1)])
  }

  const addFinished = (index: number) => {
    setfinished(finished.concat(inProgress[index]))
    setinProgress([...inProgress.slice(0, index), ...inProgress.slice(index + 1)])
  }
  
  const removeFinished = (index: number) => {
    setfinished([...finished.slice(0, index), ...finished.slice(index + 1)])
  }

  const backToInProgress = (index: number) => {
    setinProgress(inProgress.concat(finished[index]))
    setfinished([...finished.slice(0, index), ...finished.slice(index + 1)])
  }

  return (
    <main className='flex justify-center items-center h-screen round-lg'>
      <Paper elevation={5} className='p-5 flex flex-col'>
        <div className='flex m-2'>
          <TextField className='m-2' label="To do" onChange={todoHandleChange} value={todo}/>
          <Button className='m-2'variant='outlined' onClick={()=> addPlans()}>Add</Button>
        </div>
        <div className='flex justify-between'>
          <div className='plans flex flex-col items-center'>
            <div className='text-xl'>Plans</div>
            {plans.map((item: string, index: number) => {
              return (
                <Button className='m-2' variant='outlined' key={index} onClick={() => addInProgress(index)} onContextMenu={() => removePlan(index)}>{item}</Button>
              )
            })}
          </div>
          <div className='plans flex flex-col items-center'>
            <div className='text-xl'>In Progress</div>
            {inProgress.map((item: string, index: number) => {
              return (
                <Button className='m-2' variant='outlined' key={index} onClick={() => addFinished(index)} onContextMenu={() => backToPlan(index)}>{item}</Button>
              )
            })}
          </div>
          <div className='plans flex flex-col items-center'>
            <div className='text-xl'>Finished</div>
            {finished.map((item: string, index: number) => {
              return (
                <Button className='m-2' variant='outlined' key={index} onClick={() => removeFinished(index)} onContextMenu={() => backToInProgress(index)}>{item}</Button>
              )
            })}
          </div>
        </div>
      </Paper>
    </main>
  )
}
  