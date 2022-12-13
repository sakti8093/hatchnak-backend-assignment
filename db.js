import mongoose from 'mongoose'

export const connection=async() =>{
    try{
        mongoose.connect(
            'mongodb+srv://saktiprasad:sakti2000@cluster0.w7jpfat.mongodb.net/maindb?retryWrites=true&w=majority',
            {useNewUrlParser: true},
            console.log("DB Connection ESTABLISHED")
        )
    }catch(err){
        console.log(err)
    }
}
mongoose.set('strictQuery', true);