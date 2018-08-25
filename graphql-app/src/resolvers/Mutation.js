const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { APP_SECRET,getUserId } = require('../utils');

async function signup(parent, args, context, info){
    const password  = await bcrypt.hash(args.password, 10);
    const user = await context.db.mutation.createUser({
        data: { ...args, password },
      }, `{ id }`);
      const token = jwt.sign({ userId: user.id }, APP_SECRET);
      return {
          token,
          user,
      }
}

async function login(parent, args, context, info){
    const user = await context.db.query.user({where : {email: args.email}}, '{ id password } ');
    if(!user){
        throw new Error("User not found");
    }
    const passwordValid = await bcrypt.compare(args.passsword, user.password);
    if(!passwordValid){
        throw new Error("Password mismatch!");
    }

    const token = jwt.sign({ userId: user.id}, APP_SECRET);
    return {
        token,
        user,
    }
}

function post(root,args,context,info) {
    const userId = getUserId(context);
    return context.db.mutation.createLink({
        data: {
            description: args.description,
            url : args.url,
            postedBy : { connect: {id: userId}}
        }
    },info);
}

module.exports = {
    signup,
    login,
    post
}