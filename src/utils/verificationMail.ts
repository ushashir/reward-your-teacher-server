export function emailVerificationView(token: string): string {
    const link = `http://localhost:4000/api/welcome/verify/${token}`;
    let template = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Reward your teacher platform</h2>
       <p>We are glad that you just signed up here
        </p>
        <div style="text-align:center ;">
          <a href=${link}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
     </div>
        `;
    return template;
  }
  