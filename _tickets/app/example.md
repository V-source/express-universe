```javascript login administrador snet
try {
    const authSnet = await fetch("https://back.sucrenet.com.ve/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "User-Agent": `Customer-Area/4.0.0 Villejsdev-backend`,
      },
      body: JSON.stringify({
        email: "programerLife9@gmail.com",
        password: "123456789",
        remember: true,
      }),
    });
    if (!authSnet.ok) {
      const res = await authSnet.json();
      console.log(res.errors)
      throw new Error(res.errors);
    } else {
      const response = await authSnet.json();
      const token = response.token; 
      const NewToken = new Token({token: token})
      const tokenSaved = await NewToken.save();
      console.log(tokenSaved)
    }
  } catch (error) {
    console.log(error);
    next(error);
  }

```
