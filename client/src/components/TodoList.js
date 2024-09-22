import React from 'react'
import { MdCheckBox } from 'react-icons/md'
import { Link } from 'react-router-dom'

const TODOS = [
    {id:"t1", title:"project", description:"in progress" },
    {id:"t2", title:"football", description:"playing football" },
    {id:"t3", title:"playstation", description:"playing playstation" },

  
]

const TodoList = ({todos}) => {
  return (
    <table className='table table-info w-75 m-auto'>
        <thead >
            <tr >
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th className='text-center'>HANDLE</th>
            </tr>
        </thead>
        <tbody>
            {TODOS.length !==0 ? 
                TODOS.map(todo => 
                    <tr key={todo.id}>
                        <td style={{textDecoration:'line-through'}}>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td>
                            <label>
                                <input 
                                    id='status'
                                    name='status'
                                    type='checkbox'
                                />
                            &nbsp;
                                Completed
                            </label>
                        </td>
                        <td className='text-center'>
                            <Link to ={`${todo.id}/edit`}>
                                <button className='btn btn-outline-secondary'> Edit </button>
                            </Link>
                            <Link to='delete'>
                                <button className='btn btn-outline-danger' style={{marginLeft:5}}>Delete</button>
                            </Link>
                        </td>
                    </tr>
                )
            : <p>Loading....</p>
            }
        </tbody>
    </table>
  )
}

export default TodoList