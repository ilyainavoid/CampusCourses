export const roleDeterminant = (roles) => {
    if (roles.isAdmin) {
        return 'Admin'
    }
    else if (roles.isTeacher && roles.isStudent) {
        return 'Mixed'
    }
    else if (roles.isTeacher) {
        return 'Teacher'
    }
    else if (roles.isStudent) {
        return 'Student'
    }
    else {
        return 'Guest'
    }
}