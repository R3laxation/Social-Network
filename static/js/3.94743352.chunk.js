(this["webpackJsonpmy-social-net-work"]=this["webpackJsonpmy-social-net-work"]||[]).push([[3],{296:function(e,t,a){},297:function(e,t,a){e.exports={dashboard:"ProfileInfo_dashboard__2BzoH",descr:"ProfileInfo_descr__2kmG_"}},298:function(e,t,a){e.exports={myPosts:"MyPosts_myPosts__2uU9M"}},299:function(e,t,a){e.exports={item:"Post_item__ULwHT"}},300:function(e,t,a){"use strict";a.r(t);var n=a(32),s=a(33),r=a(36),l=a(35),u=a(0),o=a.n(u),c=a(296),i=a.n(c),m=a(297),p=a.n(m),d=a(31),f=a(124),b=function(e){var t=Object(u.useState)(!1),a=Object(f.a)(t,2),n=a[0],s=a[1],r=Object(u.useState)(e.status),l=Object(f.a)(r,2),c=l[0],i=l[1];Object(u.useEffect)((function(){i(e.status)}),[e.status]);return o.a.createElement("div",null,!n&&o.a.createElement("div",null,o.a.createElement("span",{onDoubleClick:function(){s(!0)}},e.status||"--------")),n&&o.a.createElement("div",null,o.a.createElement("input",{onBlur:function(){s(!1),e.updateStatus(c)},onChange:function(e){i(e.currentTarget.value)},value:c,autoFocus:!0})))};function E(e){var t=e.profile,a=e.status,n=e.updateStatus;return t?(console.log(t),o.a.createElement("div",null,o.a.createElement("div",{className:p.a.dashboard},"Dashboard"),o.a.createElement("div",{className:p.a.descr},o.a.createElement("img",{src:t.photos.small,alt:""}),o.a.createElement(b,{status:a,updateStatus:n}),o.a.createElement("div",null,"Full Name: ",t.fullName),o.a.createElement("div",null,"About: ",t.aboutMe),o.a.createElement("div",null,"VK: ",t.contacts.vk)))):o.a.createElement(d.a,null)}var h=a(91),v=a(298),g=a.n(v),P=a(299),k=a.n(P);function O(e){return o.a.createElement("div",null,o.a.createElement("div",{className:k.a.item},o.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn-HdBk6kXnLfK7VTkMn3YWhoct3OsGPUoFA&usqp=CAU",alt:"ava"}),e.message,o.a.createElement("div",null,o.a.createElement("span",null,"Likes")," ",e.likesCount),o.a.createElement("div",null,o.a.createElement("span",null,"Dislikes"))))}var j=a(85),S=a(123),_=a(82),y=a(29),N=o.a.memo((function(e){var t=e.posts.map((function(e){return o.a.createElement(O,{id:e.id,message:e.message,likesCount:e.likesCount})}));return o.a.createElement("div",{className:g.a.myPosts},o.a.createElement(A,{onSubmit:function(t){e.addPost(t.newPostText)}}),o.a.createElement("div",null,"New Post"),o.a.createElement("div",{className:g.a.posts},t))})),w=Object(_.a)(30),A=Object(S.a)({form:"profileAddNewPostForm"})((function(e){return o.a.createElement("form",{onSubmit:e.handleSubmit},o.a.createElement("div",null,o.a.createElement(j.a,{component:y.b,name:"newPostText",placeholder:"Post message",validate:[_.b,w]})),o.a.createElement("div",null,o.a.createElement("button",null,"Add Post")))})),U=a(15),C=Object(U.b)((function(e){return{posts:e.profilePage.posts}}),(function(e){return{addPost:function(t){e(Object(h.a)(t))}}}))(N);function x(e){return o.a.createElement("div",{className:i.a.profile},o.a.createElement(E,{profile:e.profile,status:e.status,updateStatus:e.updateStatus}),o.a.createElement(C,null))}var D=a(8),I=a(7),M=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userID;e||(e=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUsersProfile(e),this.props.getStatus(e)}},{key:"render",value:function(){return 0===Object.keys(this.props.profile).length?o.a.createElement(d.a,null):o.a.createElement(x,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),a}(o.a.Component);t.default=Object(I.d)(Object(U.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.id,isAuth:e.auth.isAuth}}),{getUsersProfile:h.c,getStatus:h.b,updateStatus:h.e}),D.f)(M)}}]);
//# sourceMappingURL=3.94743352.chunk.js.map