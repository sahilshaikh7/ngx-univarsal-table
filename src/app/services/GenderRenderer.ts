import { UtilityTs } from './utilityTs';

export function GenderRenderer(field, value) {
    if (field == 'user.url') {
        if (value) {
            return '<img src="' + value + '" width="40" height="auto"></img>';
        } else {
            return '<span class="material-icons" style="color:#826149">account_box</span>';
        }
    }
    if (field == 'user.name') {
        return value + " Ji"
    }
    if (field == 'user.dob') {
        let age = UtilityTs.getAge(value)
        // console.log(age, value);
        return age + " Yrs";
    }
    switch (value) {
        case 'MALE':
            return '<span class="material-icons" style="color:#5260FF">male</span>';
        case 'FEMALE':
            return '<span class="material-icons" style="color:#EB445A">female</span>';
        case 'Married':
            return '<span class="material-icons" style="color:#FFC408">supervised_user_circle</span>';
        case 'UnMarried':
            return '<span class="material-icons" style="color:#2ED370">account_circle</span>';
    }
}