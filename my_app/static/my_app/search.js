  
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').onsubmit = function(e) {
        e.preventDefault();
        const sku = document.querySelector('#sku').value.toLowerCase();
        const name = document.querySelector('#name').value.toLowerCase();
        const description = document.querySelector('#description').value.toLowerCase(); 
        document.querySelector("#search-result").innerHTML = "";
        var xmlhttp = new XMLHttpRequest();
        var url = `/get_search_result/?sku=${sku}&name=${name}&description=${description}`;
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                myFunction(myArr);
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function myFunction(arr) {
            var out = "";
            var i;
            if (Object.keys(arr[0]) == "message") 
            {
                out = "<h1>Not found</h1>"
            } 
            else 
            {
                for(i = 0; i < arr.length; i++) 
                {
                    out += `<tr>
                    <th>${arr[i].SKU}</th>
                    <th><a href="product/?name=${arr[i].name}"> ${arr[i].name}</a></th>
                    <th>${arr[i].description}</th>`;
                    if (arr[i].discount>0){
                        out += `<th><s>${arr[i].price}</s> <span style="color:green;">`
                        out += (arr[i].price * (1-(arr[i].discount/100))).toFixed(2);
                        out += `</span></th></tr>`;
                    }
                    else {
                        out += `<th>${arr[i].price}</th></tr>`;
                    }
                    ;
                }           
            }
            document.getElementById("search-result").innerHTML = 
            `
            <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>SKU</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
            </thead>
                ${out}
            </table>`
        }
        }
});




