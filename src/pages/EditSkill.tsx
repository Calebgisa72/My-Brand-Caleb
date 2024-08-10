import React from "react";
import { useParams } from "react-router-dom";

const EditSkill = () => {
  const { id } = useParams();
  return <div>EditSkill {id}</div>;
};

export default EditSkill;
