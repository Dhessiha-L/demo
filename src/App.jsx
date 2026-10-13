import {useState} from 'react';

function App(){
  const [task,setTask]=useState([]);
  const [updated,setUpdated]=useState(-1);
  return(
    
    <div>
      <center>
        <h2>TO DO APP</h2>
        <AppList setTask={setTask}/>
        <form onSubmit={handlesubmit}>
      <table border="1">
        <thead>
          <tr>
            <td>id</td>
            <td>task</td>
             <td>Edit</td>
             <td>Delete</td>
          </tr>
          
        </thead>
        <tbody>
          {task.map((curr)=>(
            updated===curr.id?<EditList curr={curr} setTask={setTask} task={task}/>:
            <tr>
              <td>{curr.id}</td>
               <td>{curr.name}</td>
                <td><button type="submit" onClick={()=>handleedit(curr.id)}>Edit</button></td>
                 <td><button type="button" onClick={()=>(handledelete(curr.id))}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </form>
      </center>
    </div>
  )
  function handleedit(id)
  {
    setUpdated(id);
  }
  function handledelete(id)
  {
    const newlist=task.filter((li)=>(li.id!==id))
    setTask(newlist);
  }
  function handlesubmit(e)
  {
     e.preventDefault();
     const name=e.target.elements.name.value;
    const newlist=task.map((li)=>(li.id===updated?{...task,name}:li))
    setTask(newlist)
    setUpdated(-1);
  }
}
export default App;
function EditList({curr,setTask,task})
{
  function handname(e){
    const value=e.target.value;
    const newlist=task.map((li)=>(li.id===curr.id?{...task,name:value}:li))
    setTask(newlist)
  }
  return(
    <tr>
       <td><input type="text" name="name" placeholder="enter the name" onChange={handname} value={curr.name}></input></td>
       <button >ADD</button>
    </tr>
  )
}
function AppList({setTask})
{
  function handlesubmit(e)
  {
    e.preventDefault();
    const id=e.target.elements.id.value;
    const name=e.target.elements.name.value;
    const newlist={id,name};
    setTask((prevList)=>{
      return prevList.concat(newlist)
  })
  }
  return(
    <form onSubmit={handlesubmit}>
      <input type="number" name="id" placeholder="enter the id"></input>
       <input type="text" name="name" placeholder="enter the name"></input>
       <button type="submit">ADD</button>
    </form>
  )
}