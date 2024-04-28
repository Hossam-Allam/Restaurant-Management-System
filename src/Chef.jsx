import React from "react";

const Chef = ({ chef }) => {


    return(
        <div className="chef-info">
        <img src={chef.Photo} alt="Chef" className="chef-photo" />
        <div className="chef-message">
          Hello, {chef.FirstName} {chef.LastName}
        </div>
      </div>
    );
}

export default Chef;