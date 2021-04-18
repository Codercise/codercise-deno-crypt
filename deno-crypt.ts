import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { sha1 } from "https://denopkg.com/chiefbiiko/sha1/mod.ts";
import { sha256 } from "https://denopkg.com/chiefbiiko/sha256/mod.ts";

let user;
async function denoCrypt() {
    // const userJSON = await fetch('https://randomuser.me/api/?seed=codercise&password=special,upper,lower,number,8-24');
    const userJSON = await fetch('https://randomuser.me/api/?seed=codercise');

    user = await userJSON.json();
    const loginData = user.results[0].login;
    console.log(loginData);

    const bc = await bcrypt.hash(loginData.password + loginData.salt);

    console.log("\n\nbcrypt")
    console.log(bc);

    const res = await bcrypt.compare(loginData.password + loginData.salt, bc)

    console.log("Does bcrypt match?", res, "\n\n");

    const sha = sha1(loginData.password + loginData.salt, "utf8", "hex");
    
    console.log("SHA1:")
    console.log(sha.toString());
    console.log("Does SHA1 Match?", sha.toString() === loginData.sha1, "\n\n");

    const sha2 = sha256(loginData.password + loginData.salt, "utf8", "hex");
    console.log("SHA256:")
    console.log(sha2.toString());
    console.log("Does SHA256 match?", sha2.toString() === loginData.sha256);

}

denoCrypt();