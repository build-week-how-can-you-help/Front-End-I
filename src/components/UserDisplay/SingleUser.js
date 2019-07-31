import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SingleUser = props => {
  const [ isEditing, setIsEditing ] = useState(false);

  const onClickHandler = () => {
    setIsEditing(!isEditing);
  }

  return(
    <div className="user-card">
      { isEditing ? (
        <table>
          <tbody>
            <tr>
              <td>
                username:
              </td>
              <td>
                {props.userInfo.username}
              </td>
            </tr>
            <tr>
              <td>role:</td>
              <td>
                {props.userInfo.userRoles[0].role.name}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table>
          <tbody>
            <tr>
              <td>
                username:
              </td>
              <td>
                {props.userInfo.username}
              </td>
            </tr>
            <tr>
              <td>role:</td>
              <td>
                {props.userInfo.userRoles[0].role.name}
              </td>
            </tr>
          </tbody>
        </table>
      )
      )}
      <span onClick={onClickHandler} className="edit">
        { isEditing ? 
          'cancel'
        :
          'edit'
        }
      </span>
    </div>
  )
}

export default SingleUser;