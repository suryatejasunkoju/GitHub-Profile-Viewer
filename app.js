// When we press enter key then also profile loads
document.addEventListener('keypress', (event)=>{
    if(event.key==="Enter"){
        searchGitHub();
    }
});

async function searchGitHub() 
{
    let profile_name=document.getElementById('url').value;
    if(profile_name.length==0){
        alert("Github link can't be empty !!!");
        return;
    }
    profile_name=profile_name.substring(19, profile_name.length+1);
    // https://github.com/suryatejasunkoju
    // console.log(profile_name);
    // if previously card is not there then we are going to create one.
    // console.log("Existance="+JSON.stringify(document.getElementById("card")));
    if(document.getElementsByClassName("card")[0]===undefined)
    {
        // console.log("In if,"+"Existance="+document.getElementsByClassName("card")[0]);
        const f=await getUser(profile_name);     
    } 
    else{
        // console.log("In else,"+"Existance="+document.getElementsByClassName("card")[0]);
        //remove previous card and build current card
        document.getElementsByClassName("card")[0].remove();
        const f=await getUser(profile_name);
    }
};
async function getUser(username)
{
    let base_api_url="https://api.github.com/users/";
    const response= await fetch(base_api_url+username);
    // console.log(response.type);//response is of "cors" type. 
    // cors=cross origin requests. sors=same origin requests.
    // Let's assume that curr webapp is hosted on netlify, then same orgin="netlify" and cross orgin=any websites other than netlify.
    //We can make sors requests without any restrictions.But to make cors request, there are some restrictions. 
    // Refer : https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

    // converting cors type to json 
    const data=await response.json();
    // console.log(JSON.stringify(data,null,4));
    if(Object.keys(data).length===2){
        //when data has only 2 attributes. Similar to the below one.
        //{
        //   "message": "Not Found",
        //   "documentation_url": "https://docs.github.com/rest/reference/users#get-a-user"
        // }
        //We got above object as data bcoz we have inserted wrong username in the url
        alert("Can't fetch Details from Github api."+"\n"+"Please, Check the Link you have pasted");
        return;
    }
    const user={
                name:data.name,
                email:data.email,
                bio:data.bio,
                location:data.location,
                image_url:data.avatar_url,
                followers:data.followers,
                following:data.following,
                gists:data.public_gists,
                repos:data.public_repos,
    };
    // console.log(JSON.stringify(user,null,4));
    // const result=document.getElementById("result");
    // console.log(result);
    const cardDiv=document.createElement("div");
    // <div class="card" id="result">
    // </div>
    cardDiv.innerHTML=
    `<img src="${user.image_url}" class="profile-pic" alt="Profile Pic">
        <table>
            <tr>
                <td class="property">Name</td>
                <td>${user.name}</td>
            </tr>
            <!--
            <tr>
                <td class="property">Email</td>
                <td>${user.email}</td>
            </tr>
            -->
            <tr>
                <td class="property">Location</td>
                <td>${user.location}</td>
            </tr>
            <tr>
                <td class="property">Bio</td>
                <td>${user.bio}</td>
            </tr>
        </table>
        <ul>
            <li>
                <div class="item">
                    <p>followers</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/3683/3683214.png" class="icon">
                    <span>${user.followers}</span>
                </div>
            </li>
            <li>
                <div class="item">
                    <p>following</p>
                    <img src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png" class="icon">
                    <span>${user.following}</span>
                </div>
            </li>
            <li>
                <div class="item">
                    <p>repositories</p>
                    <img src="https://img.icons8.com/ios-glyphs/512/repository.png" class="icon">
                    <span>${user.repos}</span>
                </div>
            </li>
        </ul>`;
        cardDiv.classList.add('card');
        document.body.appendChild(cardDiv);
};