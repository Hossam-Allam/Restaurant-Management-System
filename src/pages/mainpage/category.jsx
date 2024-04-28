import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap"; 

export const Category = (props) => {
  const { name } = props.data;

  return (
    <Col sm={6} md={4} lg={3}> 
      <Link to={`/category/${name}`}>
        <div>
          <p>
            <b>{name}</b>
          </p>
        </div>
      </Link>
    </Col>
  );
};
