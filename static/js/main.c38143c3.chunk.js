(this.webpackJsonpwebprojectfrontend=this.webpackJsonpwebprojectfrontend||[]).push([[0],{145:function(t,e,n){t.exports=n(290)},150:function(t,e,n){},270:function(t,e,n){},287:function(t,e,n){},288:function(t,e,n){},290:function(t,e,n){"use strict";n.r(e);var o,i,r,a,d=n(0),c=n.n(d),s=n(26),u=n.n(s),l=n(15),p=n(19),h=n(20),f=n(21),m=n(22),b=n(300),T=n(296),N=n(43),O=(n(150),function(t){function e(){return Object(l.a)(this,e),Object(h.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){return c.a.createElement(b.a,{inverted:!0,className:"navBar",fixed:"top"},c.a.createElement(T.a,{className:"navBarContainer"},c.a.createElement(b.a.Item,{header:!0},c.a.createElement(N.a,{className:"logo",name:"sticky note outline"}),"TODO")))}}]),e}(d.Component)),g=n(17),j=n(48),v=n.n(j),y=n(298),C=n(299),D=n(49),_=n(297),k=n(23),E=(n(270),Object(k.b)("store")(o=Object(k.c)(o=function(t){function e(){var t,n;Object(l.a)(this,e);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(n=Object(h.a)(this,(t=Object(f.a)(e)).call.apply(t,[this].concat(i)))).state={todoDescription:n.props.todo.description,todoCheckbox:n.props.todo.isChecked},n.onChange=function(t){n.setState({todoDescription:t.target.value})},n.onEnterDown=function(t){"Enter"===t.key&&(t.preventDefault(),n.onUpdateDescription(),t.target.blur())},n.onUpdateDescription=function(){n.props.todo.description!==n.state.todoDescription&&(n.state.todoDescription.trim()?n.updateTodo(n.state.todoCheckbox):n.props.store.deleteTodo(n.props.noteId,n.props.todo._id))},n.onToggleCheck=function(){var t=!n.state.todoCheckbox;n.setState({todoCheckbox:t}),n.updateTodo(t)},n.updateTodo=function(t){var e=Object(D.a)({},n.props.todo,{description:n.state.todoDescription,isChecked:t});n.props.store.updateTodo(n.props.noteId,e)},n}return Object(m.a)(e,t),Object(p.a)(e,[{key:"componentWillReceiveProps",value:function(t){this.setState({todoDescription:t.todo.description,todoCheckbox:t.todo.isChecked})}},{key:"render",value:function(){return c.a.createElement("div",{className:"todoContainer"},c.a.createElement(_.a,{className:"todoCheckbox",checked:this.state.todoCheckbox,onChange:this.onToggleCheck}),c.a.createElement(v.a,{className:"customInput todoDescription",html:this.state.todoDescription,onBlur:this.onUpdateDescription,onKeyDown:this.onEnterDown,onChange:this.onChange}),c.a.createElement(C.a,{className:"deleteTodoButton",circular:!0,icon:"cancel",onClick:this.props.store.deleteTodo.bind(this,this.props.noteId,this.props.todo._id)}))}}]),e}(d.Component))||o)||o),w=function(t){function e(){return Object(l.a)(this,e),Object(h.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){var t=this;return this.props.todos.slice().sort((function(t,e){return new Date(t.createdAt)>new Date(e.createdAt)?-1:1})).map((function(e){return c.a.createElement(E,{todo:e,noteId:t.props.noteId})}))}}]),e}(d.Component),A=(n(287),Object(k.b)("store")(i=Object(k.c)(i=function(t){function e(){var t,n;Object(l.a)(this,e);for(var o=arguments.length,i=new Array(o),r=0;r<o;r++)i[r]=arguments[r];return(n=Object(h.a)(this,(t=Object(f.a)(e)).call.apply(t,[this].concat(i)))).state={newTodoString:"",titleString:n.props.note.title.trim()},n.onChange=function(t,e){n.setState(Object(g.a)({},t,e.target.value))},n.onEnterDown=function(t,e){"Enter"===e.key&&t(e)},n.onUpdateTitle=function(t){n.state.titleString.trim()||n.setState({titleString:""}),n.props.store.updateTitle(n.props.note._id,n.state.titleString),t.target.blur()},n.onAddTodo=function(t){t.preventDefault(),n.state.newTodoString.trim()&&(n.props.store.addTodo(n.props.note._id,n.state.newTodoString),n.setState({newTodoString:""}))},n}return Object(m.a)(e,t),Object(p.a)(e,[{key:"componentWillReceiveProps",value:function(t){this.setState({titleString:t.note.title.trim()})}},{key:"render",value:function(){var t=this.props.note,e=t._id,n=t.todos,o=t.createdAt;return c.a.createElement("div",null,c.a.createElement(y.a,{className:"noteCard"},c.a.createElement(y.a.Content,null,c.a.createElement(v.a,{className:"customInput noteTitle",html:this.state.titleString,placeholder:"Title",onChange:this.onChange.bind(this,"titleString"),onBlur:this.onUpdateTitle,onKeyDown:this.onEnterDown.bind(this,this.onUpdateTitle)}),c.a.createElement(y.a.Meta,{className:"noteDate"},new Date(o).toLocaleDateString()),c.a.createElement(y.a.Description,null,c.a.createElement("div",null,c.a.createElement(N.a,{name:"plus"}),c.a.createElement(v.a,{className:"customInput addTodoInput",html:this.state.newTodoString,placeholder:"New todo",onBlur:this.onAddTodo,onKeyDown:this.onEnterDown.bind(this,this.onAddTodo),onChange:this.onChange.bind(this,"newTodoString")})),c.a.createElement("div",{className:"todoListContainer"},c.a.createElement(w,{todos:n,noteId:e})),c.a.createElement(C.a,{className:"deleteNoteButton",icon:"trash",onClick:this.props.store.deleteNote.bind(this,e)})))))}}]),e}(d.Component))||i)||i),S=Object(k.b)("store")(r=Object(k.c)(r=function(t){function e(){return Object(l.a)(this,e),Object(h.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(p.a)(e,[{key:"render",value:function(){return this.props.store.notes.map((function(t){return c.a.createElement(A,{note:t})}))}}]),e}(d.Component))||r)||r,Q=(n(288),n(289),n(301)),I=Object(k.b)("store")(a=Object(k.c)(a=function(t){function e(){return Object(l.a)(this,e),Object(h.a)(this,Object(f.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(p.a)(e,[{key:"componentDidMount",value:function(){this.props.store.getNotes()}},{key:"render",value:function(){return c.a.createElement("div",{className:"app"},c.a.createElement(O,null),c.a.createElement("div",{className:"navBarPlaceholder"}),c.a.createElement("div",{className:"container"},c.a.createElement(Q.a,{centered:!0},c.a.createElement(S,null)),this.props.store.notes.length<10&&c.a.createElement(C.a,{circular:!0,icon:"plus",className:"addNoteButton",onClick:this.props.store.addNote})))}}]),e}(d.Component))||a)||a,B=n(7),U=new function t(){Object(l.a)(this,t),this.notesQuery="\n        query {\n            notes {\n                _id\n                title\n                todos {\n                    _id\n                    description\n                    isChecked\n                    createdAt\n                }\n                createdAt\n            }\n        }\n    ",this.addNoteQuery="\n        mutation {\n            createNote {\n                _id\n                title\n                todos {\n                    _id\n                    description\n                    isChecked\n                    createdAt\n                }\n                createdAt\n            }\n        }\n    ",this.updateTitleQuery=function(t,e){return'\n        mutation {\n            updateNoteTitle(updatedNote: {\n                _id: "'.concat(t,'",\n                title: "').concat(e,'"\n            }) {\n                _id\n                title\n            }\n        }\n    ')},this.deleteNoteQuery=function(t){return'\n        mutation {\n            deleteNote(noteId: "'.concat(t,'") {\n                _id\n            }\n        }\n    ')}},x=new function t(){Object(l.a)(this,t),this.addTodoQuery=function(t,e){return'\n    mutation {\n        createTodo(newTodo:{description: "'.concat(e,'", todoNote: "').concat(t,'"}) {\n            _id\n            description\n            isChecked\n            todoNote {\n                _id\n            }\n        }\n    }\n')},this.updateTodoQuery=function(t,e,n){return'\n    mutation {\n        updateTodo(updatedTodo: {_id: "'.concat(t,'", description: "').concat(e,'", isChecked: ').concat(n,"}) {\n            _id\n            description\n            todoNote {\n                _id\n            }\n        }\n    }\n")},this.deleteTodoQuery=function(t){return'\n    mutation {\n        deleteTodo(todoId: "'.concat(t,'") {\n            _id\n            todoNote {\n                _id\n            }\n        }\n    }\n')}},P=function t(){var e=this;Object(l.a)(this,t),this.notes=[],this.renderNotes=function(t){t.notes?e.notes=t.notes.slice().sort((function(t,e){return new Date(t.createdAt)>new Date(e.createdAt)?-1:1})):console.log("Get notes: No data retreived from backend.")},this.getNotes=function(){e.dbOperation(U.notesQuery,e.renderNotes)},this.renderAddNote=function(){e.notes.unshift({_id:"",title:"",todos:[],createdAt:null})},this.addNote=function(){e.renderAddNote();e.dbOperation(U.addNoteQuery,(function(t){if(t.createNote){var n=t.createNote,o=n._id,i=n.title,r=n.createdAt,a=e.notes.find((function(t){return!t._id&&i===t.title}));a._id=o,a.createdAt=r}else console.log("Add note: No data retreived from backend.")}))},this.renderUpdateTitle=function(t,n){var o=e.notes.find((function(e){return t===e._id}));o||console.log("Update title: note not found."),o.title=n},this.updateTitle=function(t,n){var o=e.notes.find((function(e){return t===e._id}));o?o.title!==n&&(e.renderUpdateTitle(t,n),e.dbOperation(U.updateTitleQuery(t,n))):console.log("Update title: note not found.")},this.renderDeleteNote=function(t){var n=!1;e.notes=e.notes.filter((function(e){return n=n||t!==e._id,t!==e._id})),n||console.log("Delete title: note not found.")},this.deleteNote=function(t){e.renderDeleteNote(t),e.dbOperation(U.deleteNoteQuery(t))},this.renderAddTodo=function(t,n){e.notes=e.notes.map((function(e){return t===e._id&&e.todos.unshift({_id:"",description:n,isChecked:!1,todoNote:e,createdAt:null}),e}))},this.addTodo=function(t,n){e.renderAddTodo(t,n);e.dbOperation(x.addTodoQuery(t,n),(function(t){if(t.createTodo){var n=t.createTodo,o=n._id,i=n.description,r=n.todoNote,a=n.createdAt,d=e.notes.find((function(t){return t._id===r._id})),c=d.todos.find((function(t){return!d._id&&i===t.description}));c._id=o,c.createdAt=a}else console.log("Add todo: No data retreived from DB.")}))},this.renderUpdateTodo=function(t,n){var o=e.notes.find((function(e){return t===e._id}));o?o.todos=o.todos.map((function(t){return t._id===n._id?n:t})):console.log("Update todo: Note not found.")},this.updateTodo=function(t,n){e.renderUpdateTodo(t,n),e.dbOperation(x.updateTodoQuery(n._id,n.description,n.isChecked))},this.renderDeleteTodo=function(t,n){var o=e.notes.find((function(e){return t===e._id}));if(o){var i=!1;o.todos=o.todos.filter((function(t){return i=i||n!==t._id,n!==t._id})),i||console.log("Delete todo: Todo not found.")}else console.log("Delete todo: Note not found.")},this.deleteTodo=function(t,n){e.renderDeleteTodo(t,n),e.dbOperation(x.deleteTodoQuery(n),null)},this.dbOperation=function(t,e){fetch("https://todoprojectbackend.herokuapp.com/graphql",{method:"POST",body:JSON.stringify({query:t}),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status&&201!==e.status)throw new Error("DB operation failed. \nQuery: \n"+t);return e.json()})).then((function(t){e&&e(t.data)})).catch((function(e){console.log("DB operation failed. \nQuery: \n"+t),console.log(e)}))}};Object(B.j)(P,{notes:B.o,getNotes:B.f,addNote:B.f,updateTitle:B.f,deleteNote:B.f,addTodo:B.f,updateTodo:B.f,deleteTodo:B.f});var q=new P,J=c.a.createElement(k.a,{store:q},c.a.createElement(I,null));u.a.render(J,document.getElementById("root"))}},[[145,1,2]]]);
//# sourceMappingURL=main.c38143c3.chunk.js.map