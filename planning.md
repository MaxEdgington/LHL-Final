## HTML

# My Project Main Page
-body 
  - Header
    -  Logo
    -  settings 
    -  profile (img)
    - Nav 
        <div>
      - TBD links
  
  - Main
    - Section(Kanban Board)
      - Collumns - Dropables (To Do, In Progress, In Review, Complete)
      - <dropable>Task<dropable>
      - <div class = "temp-dropable"> dropable 
        <div class = "dragable" > dragable </div>
        <div class = "dragable" > dragable </div>
        <div class = "dragable" > dragable </div>
        </div>
        - Tasks - Dragables - onClick to open modal
          - Modal
            - Prepoulated Edit feilds
            - Delete Button
            - Save Button
            - Close Button (X)

            <!-- Trigger/Open The Modal -->

            <div class = "open-modal from task" ></div>
            <!-- The Modal -->
            <div id="myModal" class="modal">

            <!-- Modal content -->
            <div class="modal-content">
            <button id = "delete"></button>
            <button id = "save"></button>
            <button id = "html"></button>
            <p class = "task description"></p>
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>

            </div>

        
    - Section - Slide Out? (Chat)
<div class = "slideout"> slideout 
    <div class = "chat component">
        <div class = "chat view"> chat view  
        </div>
        <form> 
        <input> <button> 
        </button> 
        </input>
        </form>

      - Form 
        - Button
    </div>
</div>


## COMPONENTS

- App (Props: no)

  - Main Route
    - Header/Nav (state: loggedin_user)
      - TBD
    - CollumnList (is the Kanban Board) -these are hard-coded *call this the Board*
        - Modal Route - conditionally rendered, when TaskItem clicked
          - Form
        - CollumnItem *call this collumn*
            - TaskList
              - TaskListItem (data: task)    *call this task*
              - newTaskInput (creates new task and rerenders TaskList with new TLI  )
    - Chat

??add more users?

<App />
  -<TaskModal />
  -<CollunmList />
     -<CollumItem />
       -<TaskList />
         -<TaskItem />
       