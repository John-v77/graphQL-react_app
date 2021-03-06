const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = {   
    // Create User Resolver __________________________________________________
    createUser: async args =>{
        try{
            const existingUser = await User.findOne({email:args.userInput.email})
            if(existingUser) throw new Error('User exists already.')

            const hashedPassword =  await bcrypt.hash(args.userInput.password, 12)
            
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            })

            const result = await user.save()
            console.log(result, 'result')
            return {...result._doc, password:null,  _id: result.id}    

        }catch(err) { throw err }
    },  // end of User Resolver __________________________________________________


    //this name has to match the name in "type RootQuery" schema-index.js
    login: async({email, password}) => {
        const user = await User.findOne({email:email})

        if(!user) throw new Error('Invalid Cridentials: user not found')

        const isEqual = await bcrypt.compare(password, user.password)

        if(!isEqual) throw new Error('Invalid Credentials: password is incorrect')

        const token = await jwt.sign(
                                {userId: user.id, email: user.email},
                                'superLongerSuperSecretKey',
                                { expiresIn:'1h' }) 
        return { 
                userId: user.id, 
                token: token, 
                tokenExpiration: 1}
    }
}
