const Header = ({ name }) => {
    return(
      <h1>{name}</h1>
    )
  }
  
  const Part = ({ name, exercise }) => {
    return(
      <p>{name} {exercise}</p>
    )
  }
  
  const Content = ({ parts }) => parts.map(
    part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)
  
  const Total = ({ parts }) => {
    const exercises = parts.map(part => part.exercises)
    const sum = exercises.reduce((a, b)=> a + b, 0)
  
    return(
      <p><strong>total of {sum} exercises</strong></p>
    )
  }
  
  const Course = ({ courses }) => {
    return (
      <>
        {courses.map(course => 
          <div key={course.id}>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
        )}
      </>
    )
  }

  export default Course