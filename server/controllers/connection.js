import mongoose from "mongoose";

async function connect2Db() {
   try {
      await mongoose.connect('mongodb+srv://vinaymallela07:w2BbEdr3zL4hTSiv@cluster0.bpylmsb.mongodb.net/')
   } catch (err) {
      console.log(err);
   };
}

export default connect2Db;
