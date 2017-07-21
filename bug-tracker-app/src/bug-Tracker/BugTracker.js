import React , { Component } from 'react';
import './BugTracker.css';

class BugTracker extends Component{
	onAddNewClick(){
		var bugName = this.refs.txtBugName.value;
		this.props.newBugAction(bugName);
	}
	onBugNameClick(bug){
		this.props.toggleBugAction(bug);
	}
	render(){
		let bugList = this.props.bugs;
		let bugItems = bugList.map((bug,index) => {
			var bugDisplay = bug.isClosed ?
				(
					<span className="bugname closed" onClick={this.onBugNameClick.bind(this, bug)}>
						{bug.name}
					</span>
				) : 
				(
					<span className="bugname {closedClass}" onClick={this.onBugNameClick.bind(this, bug)}>
						{bug.name}
					</span>
				);
			return (
				<li key={index}>
					{ bugDisplay }
					<div>Close -> [{bug.isClosed.toString()}]</div>
				</li>
			)
		});
		let closedCount = bugList.reduce((prevResult, bug) => bug.isClosed ? ++prevResult : prevResult, 0);
		return(
			<div>
				<section className="stats">
					<span className="closed">{closedCount}</span>
					<span> / </span>
					<span>{bugList.length}</span>
				</section>
				<section className="edit">
					<label htmlFor="">Bug Name :</label>
					<input type="text" ref="txtBugName" />
					<input type="button" value="Add New" onClick={this.onAddNewClick.bind(this)}/>
				</section>
				<section className="list">
					<ol>
						{bugItems}
					</ol>
					<input type="button" value="Remove Closed" onClick={() => this.props.removeClosedAction()}/>
				</section>
			</div>
		);
	}
}

export default BugTracker;