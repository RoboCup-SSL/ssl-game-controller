# FAQ

## How does the game-controller compare to ssl-refbox
The ssl-game-controller replaces the ssl-refbox. With the introduction of automatic referees, there was demand for several new features. To accommodate these, the ssl-refbox has been rewritten to take advantage of modern technologies.

The referee message, that is send to the teams, has no breaking changes. Teams do not need to change their systems. Additional data will be send with the referee messages though. To read those changes, teams can update their `.proto` files from this repository to take advantage of it.

Teams will also have the possibility to connect to a new interface, where they can change their goalkeeper number.

List of new features:
* Modern, scalable Web-UI
* More control of the state (change almost all values)
* Automatically save and restore state
* State history with undo button
* Includes state that was previously located in all autoRefs
* New Game Event concept for better interaction with multiple autoRefs
* Game protocol that documents all changes in the state
* New interfaces for autoRefs and teams
* A graphical client can be integrated

## How to start a new game?
* Go to Settings (top left button)
* Start new game
* Select team names
* Switch sides, if necessary (button)
* Select division, if necessary (button switch)
* Set goalkeeper ids
* Choose which team will start with kickoff
* divB: set ball placement capability

## How to end a game?
* Stop the game
* Make sure you are in the second half, extra second half or in shootout
* An 'End of Game' button should show up on the top

Purpose: Notify team AI about end of game and log it in log files.

## How to give a goal?
If an autoRef has sent a 'possible goal', this event can be accepted on the right.

To add a goal manually:
* New Event (on the top)
* Select Goal
* Insert parameters
* Add

## How to correct the current state of a team?
Most of the state can be changed with the edit buttons. Either in the settings modal, or in the team overview.
This should only be used in case of misbehavior! Goals, yellow cards, etc. should be given through the respective events ('New event' button) or in the manual view.

## How to revert a change?
The game control allows reverting certain actions like game events or stage changes. For these actions, a revert button will show up in the protocol table.
The button reverts this line and all following.

## How to disable certain game events?
Go to 'Configure Behaviors' in the settings modal and select the game event.  
A game event can be set to be:
* Always accepted
* Only accepted when there is a majority between all connected autoRefs (if only one autoRef is connected, it will always get a majority)
* Ignored (logged as an ignored event in the table)

## How does the continue button work?
Based on the current game events, the next command will be determined.
This command is sent, when the continue button is pressed.
The button shows the command that it will trigger.

## How can I see if my team is connected?
Active connections to teams are shown as an icon in the team overview.

## The controller crashes on start. What can I do?
Try deleting the `state-store.json.stream` file in the working directory. It may have got corrupted.
