## Getting Started with Our File Structures
1) Log In to your GitHub account
2) [Fork this repository](https://github.com/samheckle/web-projects-starter)
![fork](https://github.com/samheckle/web-projects-fa-25/tree/main/classes/week_01/images/fork.png)
3) Rename your forked repository to `web-projects`
4) Create the repository
5) Open your terminal or git bash on your computer
6) Generate your ssh keys with [this tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
7) Add your ssh key to your GitHub account [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
8) Find a good place to store your folder on your computer. 
    
    I use a folder called `dev` which is located in my user account. So an example path to that location would be `/Users/samheckle/dev/web-projects-fa-25/`. I do this so that my file path is shorter, but if you want to put the folder on your desktop we can use that too. 

    Once you have picked a place, you need to navigate to that folder using the Command Line Interface (CLI). Think of it as a finder or file explorer where we can only view one folder at a time.

    We can navigate through our terminal with a few commands:

    * `pwd` gives us the path of the folder or directory we are in. 
    * `ls` means "list" and shows all the files that exist in the directory
    * `cd` change directory. this is how we navigate through our filesystem. 
        * `cd folderName` will put us inside a folder.
        * `cd ../` will move up one folder
9) Using our new commands, navigate to where you want your class folder to live in the CLI.   
    On MacOS from finder, I can find my folder:  
    ![finder](https://github.com/samheckle/web-projects-fa-25/tree/main/classes/week_01/images/myfolders.png)    
    and you can right click and open in terminal.  
    ![open in terminal](https://github.com/samheckle/web-projects-fa-25/tree/main/classes/week_01/images/terminal.png)    
    From CLI, I can run the command `cd dev` and that will bring me to my `dev` folder  
    ![cd dev](https://github.com/samheckle/web-projects-fa-25/tree/main/classes/week_01/images/cddev.png)  
    We can also [customize the look of our terminals](https://medium.com/@adamtowers/how-to-customize-your-terminal-and-bash-profile-from-scratch-9ab079256380), which is why mine has my user + folder name + emoji.

        
10) Clone the repo inside of whichever folder you want it to live. Double check you are in the right location using `pwd`. From there, use `git clone` and your ssh url
![ssh clone](https://github.com/samheckle/web-projects-fa-25/tree/main/classes/week_01/images/clonessh.png)  