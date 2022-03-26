import { configureStore } from '@reduxjs/toolkit'
import addVoca from '../modules/addVoca'


export default configureStore({
    reducer: {
        voca: addVoca,
    },
})