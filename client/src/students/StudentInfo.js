import {makeAutoObservable} from "mobx";

export default class StudentInfo {
    constructor() {
        this._isAuth = false
        this._email = ""
        this._student = {}
        makeAutoObservable(this)
    }

    setEmail(email) {
        this._email = email
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setStudent(student) {
        this._student = student
    }

    get email() {
        return this._email
    }
    get isAuth() {
        return this._isAuth
    }
    get student() {
        return this._student
    }
}