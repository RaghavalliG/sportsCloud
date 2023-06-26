import react from 'react';
import { useState, useEffect } from 'react';
import { Network } from '../../../Services/Api';
// import './App.css';

function Assignment({ getAssignments }) {

    const [assignments, setAssignment] = useState([])

    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // console.log("userMe===>", user);
        // setUser(user);
        // // console.log("USerData", userdata);
        // const userLocal = JSON.parse(localStorage.getItem("user"));
        // console.log("userData after login--->", userLocal)
        // let userD = userLocal && userLocal._id ? true : false;
        // setUser(userD);
        // setUserData(userLocal);

        AssignmentData()
        // addAssignmentData()
        // dropdownMenu()
        // deleteAssignmentData()
        // LocationData()
        // VolenteerData()
        // updateAssignmentData()
        // teamSelect()
    }, []);

    const [inputFields, setInputFields] = useState([
        { assignment_id: '',assignment_volunteer_roster_id:'' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
        console.log(data);
        getAssignments(data);

    }

    const addFields = (e) => {
        e.preventDefault();
        let newfield = { assignment_id: '' , assignment_volunteer_roster_id:''}

        setInputFields([...inputFields, newfield])
    }

    const AssignmentData = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'token': user.authtoken

            }
            console.log('user', user)

            Network('api/getAllAssignmentData', 'GET', header)
                .then(async (res) => {
                    console.log("assignmentData----", res)
                    setAssignment(res.response_data)



                })
        }
    }

    return (
        <div className="App">
            <form>
                {inputFields.map((input, index) => {
                    return (
                        <div key={index}>
                            {/* <input
                name='assignment'
                placeholder='Assignment'
                value={input.assignment}
                onChange={event => handleFormChange(index, event)}
              /> */}
                            <select name='assignment_id' onChange={event => handleFormChange(index, event)} >

                                {assignments.map((assignment) => {
                                    return (
                                        <option key={assignment._id} id={assignment._id} value={assignment._id}>{assignment.assignment_name}</option>
                                    )
                                })}
                            </select>
                   
                            <button style={{ color: "red", fontSize: "15px", float: "right" }} onClick={addFields}>Add More..</button>
                        </div>

                    )
                })}
            </form>
        </div>
    );
}

export default Assignment;