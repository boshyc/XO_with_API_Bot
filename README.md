# XO_with_API_Bot
What the project does?

  - Project is about boardgame XO with NxN and also able to choose 'X' or 'O' to start for PvP mode .
  - This project also has PvE mode aka Player Vs Bot and able to choose who can go first YOU or MYBOT! .
  - Bot is connected via API aka Backend .
  - For PvE mode, who start first must use 'X' to play the game and size of board is only at 3x3.

Why the project is useful?

  - it's use to relax with friend or yourself.
  - This project show how to connect between frontend and backend using Axios .
  - This project shows all about my logics that I've put it in .

How users can get started with the project?

  - Install npm.
  - Download this code as .zip file.
  - Extart XO_with_API_Bot file .
  - In the folder XO_with_Bot you'll see 3 folder names 'frontend' 'backend' 'API-XO'.
  - Access each folder via terminal and install all the packages using `npm install`
  - For now if everything is successed you should able to run all of them using `npm run dev`.
  - Once you run all 3 folders, open the mainpage via http://localhost:3000.
  - And there it is you can now play the GAME! .
  
Where users can get help with your project?
  - if someone has question about code or having a better idea you can say HELLO to ME.


Design and Algorithm ที่ใช้ ?

  - สำหรับดีไซน์และการออกแบบนั้นได้แนวคิดมาจากการเล่นของมนุษย์ มีการสร้างตารางขนาด N x N (เริ่มต้นที่ 3) , ผลัดกันลง Mark ของตัวเอง , คำนวนผลแพ้ชนะหรือเสมอ
  - ในส่วนของอัลกอริทึ่ม ของ PvP ใช้กฎตามความเป็นจริงใครสามารถทำแต้มสามแต้มต่อกันได้เป็นผู้ชนะ
  - ในส่วนของ PvE ใช้รูปแบบเดียวกับเงื่อนไขการชนะเดียวกับ PvP แต่จะพลิกแพลงเป็น หาก Player เข้าใกล้เงื่อนไขการชนะใดๆ จะถือว่าเป็นเรื่องร้ายแรง(Danger) และต้องรีบสกัดโดยด่วนเมื่อสามารถบล็อคได้แล้วจะเข้าสู่สถานะปลอดภัยแล้วทำการสุ่มช่องที่จะลงโดยไม่ซ้ำกับช่องที่มีสัญญลักษณ์ ['X','O'] แต่จะลงช่องที่มีค่าเป็น defualt แทน ['◇']
  - จากการวิเคราะห์ Algorithm ที่ใช้มีความคล้ายคลึงกับ Minimax Algorithm
 - Minimax Algorithm เป็นอัลกอริทึมในการตัดสินใจในการเล่นเกม โดยมี Player ที่พยายามจะเอาชนะ และมี Bot ที่คอยขัดขวางตามที่ได้กำหนดไว้
