export function welcomeEmail(name: string, email: string): string {
  const temp = `
       <div style="max-width: 700px;text-align: center; text-transform: uppercase;
       margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
       <h2 style="color: teal;">Welcome to Reward Your Teacher Platform</h2>
       <p>We are glad to have you here, below are your registered details.
        </p>
        <div style="text-align:center ;">
          <p>Your Name ${name}</p><br>
          <p>Your Email ${email}
         style="background: #277BC0; text-decoration: none; color: white;
          padding: 10px 20px; margin: 10px 0;
         display: inline-block;">Click here</a>
        </div>
     </div>
        `;
  return temp;
}
