        // Toggle Mobile Menu
        function toggleMenu() {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
        }

        // Popup Handling
        function openPopup() {
            document.querySelector(".dark_bg").classList.add('active');
            document.querySelector(".popup").classList.add('active');
            resetForm();
        }

        function closePopup() {
            document.querySelector(".dark_bg").classList.remove('active');
            document.querySelector(".popup").classList.remove('active');
            resetForm();
        }

        function resetForm() {
            const form = document.getElementById("myForm");
            form.reset();
            document.getElementById("photo").src = "./assets/pic1.png";
            form.querySelectorAll('input, textarea').forEach(input => input.disabled = false);
            document.querySelector(".popupFooter").style.display = "flex";
            document.querySelector(".modalTitle").innerText = "Fill the Form";
            document.querySelector(".submitBtn").innerText = "Submit";
        }

        // JavaScript for Handling Data
        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById("myForm");
            const imgInput = document.getElementById("uploadimg");
            const photo = document.getElementById("photo");
            const submitBtn = document.querySelector(".submitBtn");
            const modalTitle = document.querySelector(".modalTitle");
            const popupFooter = document.querySelector(".popupFooter");
            const userInfo = document.querySelector(".userInfo");
            const table = document.querySelector("table");
            const filterData = document.getElementById("search");
            const tabSize = document.getElementById("table_size");
            const entries = document.querySelector(".entries");

            let originalData = localStorage.getItem('eventProfile') ? JSON.parse(localStorage.getItem('eventProfile')) : [];
            let getData = [...originalData];

            let isEdit = false, editId;

            let arrayLength = 0;
            let tableSize = 10;
            let startIndex = 1;
            let endIndex = 0;
            let currentIndex = 1;
            let maxIndex = 0;

            showInfo();
            displayIndexBtn();

            // Image Upload Handling
            imgInput.onchange = function(){
                if(imgInput.files[0].size < 1000000){  // 1MB = 1000000
                    var fileReader = new FileReader();

                    fileReader.onload = function(e){
                        var imgUrl = e.target.result;
                        photo.src = imgUrl;
                    }

                    fileReader.readAsDataURL(imgInput.files[0]);
                }
                else{
                    alert("This file is too large!");
                }
            }

            // Show Information in Table
            function showInfo(){
                userInfo.innerHTML = "";

                var tab_start = startIndex - 1;
                var tab_end = endIndex;

                if(getData.length > 0){
                    for(var i=tab_start; i<tab_end; i++){
                        var event = getData[i];

                        if(event){
                            let createElement = `<tr class="employeeDetails">
                                <td>${i+1}</td>
                                <td><img src="${event.photo}" alt="Photo" width="40" height="40"></td>
                                <td>${event.name}</td>
                                <td>${event.company}</td>
                                <td>${event.designation}</td>
                                <td>${event.badgeName}</td>
                                <td>${event.eventTitle}</td>
                                <td>${event.eventInformation}</td>
                                <td>${event.time}</td>
                                <td>${event.date}</td>
                                

                                    <button class="btn btn-success" onclick="readInfo('${event.photo}', '${event.name}', '${event.company}', '${event.designation}', '${event.badgeName}', '${event.eventTitle}', '${event.eventInformation}', '${event.time}', '${event.date}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                                    <button class="btn btn-primary" onclick="editInfo(${i}, '${event.photo}', '${event.name}', '${event.company}', '${event.designation}', '${event.badgeName}', '${event.eventTitle}', '${event.eventInformation}', '${event.time}', '${event.date}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                                    <button class="btn btn-danger" onclick="deleteInfo(${i})"><i class="bi bi-trash"></i></button>
                                </td>
                            </tr>`;

                            userInfo.innerHTML += createElement;
                        }
                    }
                    table.style.minWidth = "1400px";
                }
                else{
                    userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="10" align="center"><br>
                        
                        <br>
                        <br>
                        <br>
                        No data available in table
                        </td></tr>`;
                    table.style.minWidth = "1400px";
                }
            }

            // Handle Form Submission
            form.addEventListener('submit', (e)=> {
                e.preventDefault();

                const information = {
                    photo: photo.src === undefined ? "./assets/pic1.png" : photo.src,
                    name: document.getElementById("name").value,
                    company: document.getElementById("company").value,
                    designation: document.getElementById("designation").value,
                    badgeName: document.getElementById("badgeName").value,
                    eventTitle: document.getElementById("eventTitle").value,
                    eventInformation: document.getElementById("eventInformation").value,
                    time: document.getElementById("time").value,
                    date: document.getElementById("date").value
                }

                if(!isEdit){
                    originalData.unshift(information);
                }
                else{
                    originalData[editId] = information;
                    isEdit = false;
                }

                getData = [...originalData];
                localStorage.setItem('eventProfile', JSON.stringify(originalData));

                submitBtn.innerText = "Submit";
                modalTitle.innerText = "Fill the Form";

                closePopup();
                highlightIndexBtn();
                displayIndexBtn();
                showInfo();
            });

            // Edit Function
            window.editInfo = function(id, photoSrc, name, company, designation, badgeName, eventTitle, eventInformation, time, date){
                isEdit = true;
                editId = id;

                photo.src = photoSrc;
                document.getElementById("name").value = name;
                document.getElementById("company").value = company;
                document.getElementById("designation").value = designation;
                document.getElementById("badgeName").value = badgeName;
                document.getElementById("eventTitle").value = eventTitle;
                document.getElementById("eventInformation").value = eventInformation;
                document.getElementById("time").value = time;
                document.getElementById("date").value = date;

                modalTitle.innerText = "Update the Form";
                submitBtn.innerText = "Update";

                document.querySelector(".popupFooter").style.display = "flex";
                document.querySelector(".dark_bg").classList.add('active');
                document.querySelector(".popup").classList.add('active');
            }

            // Read Function (View Only)
            window.readInfo = function(photoSrc, name, company, designation, badgeName, eventTitle, eventInformation, time, date){
                photo.src = photoSrc;
                document.getElementById("name").value = name;
                document.getElementById("company").value = company;
                document.getElementById("designation").value = designation;
                document.getElementById("badgeName").value = badgeName;
                document.getElementById("eventTitle").value = eventTitle;
                document.getElementById("eventInformation").value = eventInformation;
                document.getElementById("time").value = time;
                document.getElementById("date").value = date;

                modalTitle.innerText = "Profile";
                submitBtn.innerText = "Submit";
                document.querySelector(".popupFooter").style.display = "none";
                form.querySelectorAll('input, textarea').forEach(input => input.disabled = true);
                document.querySelector(".dark_bg").classList.add('active');
                document.querySelector(".popup").classList.add('active');
            }

            // Delete Function
            window.deleteInfo = function(index){
                if(confirm("Are you sure you want to delete?")){
                    originalData.splice(index, 1);
                    localStorage.setItem("eventProfile", JSON.stringify(originalData));

                    getData = [...originalData];
                    preLoadCalculations();

                    if(getData.length === 0){
                        currentIndex = 1;
                        startIndex = 1;
                        endIndex = 0;
                    }
                    else if(currentIndex > maxIndex){
                        currentIndex = maxIndex;
                    }

                    highlightIndexBtn();
                    displayIndexBtn();
                    showInfo();
                }
            }

            // Pagination Functions
            function preLoadCalculations(){
                arrayLength = getData.length;
                maxIndex = Math.ceil(arrayLength / tableSize);
            }

            function displayIndexBtn(){
                preLoadCalculations();

                const pagination = document.querySelector('.pagination');
                pagination.innerHTML = "";

                pagination.innerHTML = '<button onclick="prev()" class="prev">Previous</button>';

                for(let i=1; i<=maxIndex; i++){
                    pagination.innerHTML += `<button onclick="paginationBtn(${i})" index="${i}">${i}</button>`;
                }

                pagination.innerHTML += '<button onclick="next()" class="next">Next</button>';

                highlightIndexBtn();
            }

            function highlightIndexBtn(){
                startIndex = ((currentIndex - 1) * tableSize) + 1;
                endIndex = (startIndex + tableSize) - 1;

                if(endIndex > arrayLength){
                    endIndex = arrayLength;
                }

                entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

                var paginationBtns = document.querySelectorAll('.pagination button');
                paginationBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if(btn.getAttribute('index') === currentIndex.toString()){
                        btn.classList.add('active');
                    }
                });

                showInfo();
            }

            window.paginationBtn = function(i){
                currentIndex = i;
                highlightIndexBtn();

                if(currentIndex > 1){
                    document.querySelector('.prev').classList.add('act');
                }
                else{
                    document.querySelector('.prev').classList.remove('act');
                }

                if(currentIndex < maxIndex){
                    document.querySelector('.next').classList.add('act');
                }
                else{
                    document.querySelector('.next').classList.remove('act');
                }
            }

            window.next = function(){
                if(currentIndex < maxIndex){
                    currentIndex++;
                    highlightIndexBtn();
                }
            }

            window.prev = function(){
                if(currentIndex > 1){
                    currentIndex--;
                    highlightIndexBtn();
                }
            }

            // Highlight and Display Entries
            function highlightIndexBtn(){
                startIndex = ((currentIndex - 1) * tableSize) + 1;
                endIndex = (startIndex + tableSize) - 1;

                if(endIndex > arrayLength){
                    endIndex = arrayLength;
                }

                entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

                var paginationBtns = document.querySelectorAll('.pagination button');
                paginationBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if(btn.getAttribute('index') === currentIndex.toString()){
                        btn.classList.add('active');
                    }
                });

                showInfo();
            }

            // Change Table Size
            tabSize.addEventListener('change', ()=>{
                var selectedValue = parseInt(tabSize.value);
                tableSize = selectedValue;
                currentIndex = 1;
                startIndex = 1;
                displayIndexBtn();
            });

            // Search Functionality
            filterData.addEventListener("input", ()=> {
                const searchTerm = filterData.value.toLowerCase().trim();

                if(searchTerm !== ""){
                    const filteredData = originalData.filter((item) => {
                        const fullName = item.name.toLowerCase();
                        const company = item.company.toLowerCase();
                        const designation = item.designation.toLowerCase();
                        const eventTitle = item.eventTitle.toLowerCase();
                        const eventInformation = item.eventInformation.toLowerCase();

                        return (
                            fullName.includes(searchTerm) ||
                            company.includes(searchTerm) ||
                            designation.includes(searchTerm) ||
                            eventTitle.includes(searchTerm) ||
                            eventInformation.includes(searchTerm)
                        );
                    });

                    getData = filteredData;
                }
                else{
                    getData = [...originalData];
                }

                currentIndex = 1;
                startIndex = 1;
                displayIndexBtn();
            });

        });