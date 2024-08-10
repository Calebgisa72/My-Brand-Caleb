import React from 'react'
import { useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams();
  return (
    <div>EditProject {id}</div>
  )
}

export default EditProject