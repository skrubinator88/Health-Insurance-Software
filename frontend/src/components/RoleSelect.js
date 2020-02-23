import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {ADMIN, BASIC, SUPERUSER} from "../Globals";
import Radio from "@material-ui/core/Radio";
import React from "react";

const RoleSelect = ({role, setRole, isEditing}) => {

    return (
        <div>
            {isEditing ? <FormControl component="fieldset">
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup aria-label="role" name="role" value={role} onChange={setRole} color="primary">
                    <FormControlLabel value={SUPERUSER} control={<Radio />} disabled={true} label="SuperUser" />
                    <FormControlLabel value={ADMIN} control={<Radio />} disabled={!isEditing} label="Admin" />
                    <FormControlLabel value={BASIC} control={<Radio />} disabled={!isEditing} label="Basic" />
                </RadioGroup>
            </FormControl> : <span className="role-tag">{role.toUpperCase()}</span>}
        </div>
    );
};

export default RoleSelect;