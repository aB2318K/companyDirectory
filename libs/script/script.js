$(document).ready(function() {

    // Function to fetch and populate personnel table
    function populatePersonnelTable() {
        $.ajax({
            url: './libs/php/getAll.php',
            type: 'GET',
            success: function(result) {
                if (result.status.code === "200") {
                    let personnelTableBody = $("#personnel-tab-pane table tbody");
                    personnelTableBody.empty(); // Clear previous data
                
                    var rows = ""; // Initialize an empty string to store table rows
                
                    if (result.data.length > 0) {
                        result.data.forEach(function (item) {
                            // Concatenate table row HTML to the rows string
                            rows += `<tr>
                                        <td class="align-middle text-nowrap">${item.lastName}, ${item.firstName}</td>
                                        <td class="align-middle text-nowrap d-none d-md-table-cell">${item.department}</td>
                                        <td class="align-middle text-nowrap d-none d-md-table-cell">${item.jobTitle}</td>
                                        <td class="align-middle text-nowrap d-none d-md-table-cell">${item.location}</td>
                                        <td class="align-middle text-nowrap d-none d-md-table-cell">${item.email}</td>
                                        <td class="text-end text-nowrap">
                                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${item.id}">
                                                <i class="fa-solid fa-pencil fa-fw"></i>
                                            </button>
                                            <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="${item.id}">
                                                <i class="fa-solid fa-trash fa-fw"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                        });
                    } else {
                        rows = "<tr><td colspan='5' class='text-center'>No results found</td></tr>";
                    }
                
                    personnelTableBody.append(rows); // Append the rows string to the table body
                } else {
                    //console.error("Error fetching personnel data:", result.status.description);
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.error("Error fetching personnel data:", textStatus, errorThrown);
            }
        });
    }


    // Function to fetch and populate departments table
    function populateDepartmentsTable() {
        $.ajax({
            url: './libs/php/getAllDepartments.php',
            type: 'GET',
            success: function(result) {
                if (result.status.code === "200") {
                    let tableBody = $("#departments-tab-pane table tbody");
                    tableBody.empty(); // Clear previous data
                
                    var rows = ""; // Initialize an empty string to store table rows
                
                    if (result.data.length > 0) {
                        result.data.forEach(function (item) {
                            // Concatenate table row HTML to the rows string
                            rows += `<tr>
                                        <td class="align-middle text-nowrap">${item.name}</td>
                                        <td class="align-middle text-nowrap d-none d-md-table-cell">${item.location}</td>
                                        <td class="align-middle text-end text-nowrap">
                                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${item.id}">
                                                <i class="fa-solid fa-pencil fa-fw"></i>
                                            </button>
                                            <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${item.id}">
                                                <i class="fa-solid fa-trash fa-fw"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                        });
                    } else {
                        rows = "<tr><td colspan='3' class='text-center'>No results found</td></tr>";
                    }
                
                    tableBody.append(rows); // Append the rows string to the table body
                }                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.error("Error fetching departments data:", textStatus, errorThrown);
            }
        });
    }


    // Function to fetch and populate locations table
    function populateLocationsTable() {
        $.ajax({
            url: './libs/php/getAllLocations.php',
            type: 'GET',
            success: function(result) {
                if (result.status.code === "200") {
                    let tableBody = $("#locations-tab-pane table tbody");
                    tableBody.empty(); // Clear previous data
                
                    var rows = ""; // Initialize an empty string to store table rows
                
                    if (result.data.length > 0) {
                        result.data.forEach(function (item) {
                            // Concatenate table row HTML to the rows string
                            rows += `<tr>
                                        <td class="align-middle text-nowrap">${item.name}</td>
                                        <td class="align-middle text-end text-nowrap">
                                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="${item.id}">
                                                <i class="fa-solid fa-pencil fa-fw"></i>
                                            </button>
                                            <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${item.id}">
                                                <i class="fa-solid fa-trash fa-fw"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                        });
                    } else {
                        rows = "<tr><td colspan='2' class='text-center'>No results found</td></tr>";
                    }
                
                    tableBody.append(rows); // Append the rows string to the table body
                } else {
                    //console.error("Error fetching locations data:", result.status.description);
                }
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.error("Error fetching locations data:", textStatus, errorThrown);
            }
        });
    }


    // Call the functions to populate tables when the page loads
    populatePersonnelTable();
    populateDepartmentsTable();
    populateLocationsTable();

    //Refresh button
    $("#refreshBtn").click(function () {
        $("#searchInp").val("");
        
        if ($("#personnelBtn").hasClass("active")) {
        
        populatePersonnelTable();
            
        } else {
            
        if ($("#departmentsBtn").hasClass("active")) {
            
            populateDepartmentsTable();
            
        } else {
            
            populateLocationsTable();
            
        }
            
        }
        
    });


    // Event listener for personnel tab selection
    $("#personnelBtn").click(function () {
        $("#searchInp").val("");
        populatePersonnelTable();
    });

    // Event listener for departments tab selection
    $("#departmentsBtn").click(function () {
        $("#searchInp").val("");
        populateDepartmentsTable();
    });

    // Event listener for locations tab selection
    $("#locationsBtn").click(function () {
        $("#searchInp").val("");
        populateLocationsTable();
    });



    //Submitting Add form START===================

    //Personnel Add form
    $("#addPersonnelForm").on("submit", function (e) {
        e.preventDefault(); // Prevent default form submission
        // Collect data from the form fields
    
        var firstName = $("#addPersonnelFirstName").val().trim();
        var lastName = $("#addPersonnelLastName").val().trim();
        var jobTitle = $("#addPersonnelJobTitle").val().trim();
        var emailAddress = $("#addPersonnelEmailAddress").val().trim();
        var departmentID = $("#addPersonnelDepartment").val();

        // Send an AJAX request to add a personnel
        $.ajax({
            url: './libs/php/insertPersonnel.php',
            type: 'POST',
            dataType: 'json',
            data: {
                firstName: firstName,
                lastName: lastName,
                jobTitle: jobTitle,
                email: emailAddress,
                departmentID: departmentID
            },
            success: function (result) {
                if (result.status.code === "200") {
                    //console.log("Personnel added successfully");
                    $('#addPersonnelModal').modal('hide');
                    $("#searchInp").val("");
                    populatePersonnelTable();
                } else {
                    console.error("Error adding personnel:", result.status.description);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error adding personnel:", textStatus, errorThrown);
            }
        });
    })

    //Department add form
    $("#addDepartmentForm").on("submit", function (e) {
        // Prevent the default form submission
        e.preventDefault();

        // Collect data from the form fields
        var departmentName = $("#addDepartmentName").val().trim();
        var locationID = $("#addDepartmentLocation").val();

        // Send an AJAX request to update department information
        $.ajax({
            url: './libs/php/insertDepartment.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: departmentName,
                locationID: locationID
            },
            success: function (result) {
                if (result.status.code === "200") {
                    //console.log("Department added successfully");
                    $('#addDepartmentModal').modal('hide');
                    $("#searchInp").val("");
                    // Reload or refresh the department tab
                    populateDepartmentsTable(); 
                } else {
                    //console.error("Error adding department:", result.status.description);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.error("Error adding department:", textStatus, errorThrown);
            }
        });

    });

    //Location add form
    $("#addLocationForm").on("submit", function (e) {
        // Prevent the default form submission
        e.preventDefault();

        // Collect data from the form fields
        var locationName = $("#addLocationName").val().trim();

        // Send an AJAX request to update department information
        $.ajax({
            url: './libs/php/insertLocation.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: locationName,
            },
            success: function (result) {
                if (result.status.code === "200") {
                    //console.log("Location added successfully");
                    $('#addLocationModal').modal('hide');
                    $("#searchInp").val("");
                    // Reload or refresh the department tab
                    populateLocationsTable(); 
                } else {
                    //console.error("Error adding department:", result.status.description);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.error("Error adding department:", textStatus, errorThrown);
            }
        });

    });

    //Submitting Add form END=====================


    //Sbmitting Edit form Start ========================

    // Executes when the form button with type="submit" is clicked
    //Personnel edit form
    $("#editPersonnelForm").on("submit", function (e) {
      // Prevent the default form submission
      e.preventDefault();

      // Collect data from the form fields
      var employeeID = $("#editPersonnelEmployeeID").val();
      var firstName = $("#editPersonnelFirstName").val().trim();
      var lastName = $("#editPersonnelLastName").val().trim();
      var jobTitle = $("#editPersonnelJobTitle").val().trim();
      var emailAddress = $("#editPersonnelEmailAddress").val().trim();
      var departmentID = $("#editPersonnelDepartment").val();

      // Send an AJAX request to update personnel information
      $.ajax({
          url: './libs/php/updatePersonnel.php',
          type: 'POST',
          dataType: 'json',
          data: {
              id: employeeID,
              firstName: firstName,
              lastName: lastName,
              jobTitle: jobTitle,
              email: emailAddress,
              departmentID: departmentID
          },
          success: function (result) {
              if (result.status.code === "200") {
                  //console.log("Personnel information updated successfully");
                  $('#editPersonnelModal').modal('hide');
                  $("#searchInp").val("");
                  populatePersonnelTable();
              } else {
                  //console.error("Error updating personnel information:", result.status.description);
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              //console.error("Error updating personnel information:", textStatus, errorThrown);
          }
      });
    });


    //Department edit form
    $("#editDepartmentForm").on("submit", function (e) {
      // Prevent the default form submission
      e.preventDefault();

      // Collect data from the form fields
      var departmentID = $("#editDepartmentID").val();
      var departmentName = $("#editDepartmentName").val().trim();
      var locationID = $("#editDepartmentLocation").val();

      // Send an AJAX request to update department information
      $.ajax({
          url: './libs/php/updateDepartment.php',
          type: 'POST',
          dataType: 'json',
          data: {
              id: departmentID,
              name: departmentName,
              locationID: locationID
          },
          success: function (result) {
              if (result.status.code === "200") {
                  //console.log("Department information updated successfully");
                  $('#editDepartmentModal').modal('hide');
                  $("#searchInp").val("");
                  // Reload or refresh the department tab
                  populateDepartmentsTable(); 
              } else {
                  //console.error("Error updating department information:", result.status.description);
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              //console.error("Error updating department information:", textStatus, errorThrown);
          }
      });

    });


    // Location edit form
    $("#editLocationForm").on("submit", function (e) {
      // Prevent the default form submission
      e.preventDefault();

      // Collect data from the form fields
      var locationID = $("#editLocationID").val();
      var locationName = $("#editLocationName").val().trim();

      // Send an AJAX request to update location information
      $.ajax({
          url: './libs/php/updateLocation.php',
          type: 'POST',
          dataType: 'json',
          data: {
              id: locationID,
              name: locationName
          },
          success: function (result) {
              if (result.status.code === "200") {
                  //console.log("Location information updated successfully");
                  $('#editLocationModal').modal('hide');
                  $("#searchInp").val("");
                  // Reload or refresh the location tab
                  populateLocationsTable(); 
              } else {
                  //console.error("Error updating location information:", result.status.description);
              }
          },
          error: function (jqXHR, textStatus, errorThrown) {
              //console.error("Error updating location information:", textStatus, errorThrown);
          }
      });
    });

    //Sbmitting Edit form END========================


    //Deleting Records START============================

    //Are you sure Personnel
    $("#areYouSurePersonnelForm").on("submit", function(e) {
      
      // stop the default browser behviour
      e.preventDefault();  
      // Get the personnel ID from the hidden input field
      var personnelID = $("#areYouSurePersonnelID").val();
      $.ajax({
        url: './libs/php/deletePersonnel.php',
        type: 'POST',
        dataType: 'json',
        data: { id: personnelID },
        success: function(result) {
          if (result.status.code === "200") {
            //console.log("Personnel deleted successfully");
            $("#deletePersonnelModal").modal("hide");
            $("#searchInp").val("");
            populatePersonnelTable(); // Refresh personnel table
          } else {
            //console.error("Error deleting personnel:", result.status.description);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.error("Error deleting personnel:", textStatus, errorThrown);
        }
      });
    });


    //Delete Department
    $(document).on("click", "#areYouSureDepartmentBtn", function(e) {
      
      // stop the default browser behviour
      e.preventDefault();
      // Get the department ID from the hidden input field
      var departmentID = $("#areYouSureDeptID").val();
      $.ajax({
        url: './libs/php/deleteDepartmentByID.php',
        type: 'POST',
        dataType: 'json',
        data: { id: departmentID },
        success: function(result) {
          if (result.status.code === "200") {
            $("#searchInp").val("");
            populateDepartmentsTable(); // Refresh departments table
          } else {
            //console.error("Error deleting department:", result.status.description);
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          //console.error("Error deleting department:", textStatus, errorThrown);
        }
      });
    });

    
    // Delete Location
    $(document).on("click", "#areYouSureLocationBtn", function(e) {

      // stop the default browser behviour
      e.preventDefault();
      // Get the location ID from the hidden input field
      var locationID = $("#areYouSureLocationID").val();
      $.ajax({
          url: './libs/php/deleteLocationByID.php',
          type: 'POST',
          dataType: 'json',
          data: { id: locationID },
          success: function(result) {
              if (result.status.code === "200") {
                  $("#searchInp").val("");
                  populateLocationsTable(); // Refresh locations table
              } else {
                  //console.error("Error deleting location:", result.status.description);
              }
          },
          error: function(jqXHR, textStatus, errorThrown) {
              //console.error("Error deleting location:", textStatus, errorThrown);
          }
      });
    });

    //Deleting Records END============================



    //Filter by department or location
    function filter() {

        var depFilterID = $('#filterPersonnelByDepartment').val();
        var locFilterID = $('#filterPersonnelByLocation').val();
        var url = "";
        var id = 0;
        
        if(depFilterID == 0 && locFilterID == 0) {
            populatePersonnelTable();
        } else {
            if(depFilterID > 0) {
                url = './libs/php/personnelByDepartment.php';
                id = depFilterID;
            } else {
                url = './libs/php/personnelByLocation.php';
                id = locFilterID;
            }
    
            $.ajax({
                url: url,
                type: 'GET',
                data: {
                    id: id
                },
                success: function(result) {
                    // Switch to personnel tab
                    $('#personnelBtn').tab('show');
    
                    // Make personnel button active
                    $('#personnelBtn').addClass('active');
                    $('#departmentsBtn').removeClass('active');
                    $('#locationsBtn').removeClass('active');
                    
                    if (result.status.code === "200") {
                        let personnelTableBody = $("#personnel-tab-pane table tbody");
                        personnelTableBody.empty(); // Clear previous data
                    
                        var rows = ""; // Initialize an empty string to store table rows
                    
                        if (result.data.length > 0) {
                            result.data.forEach(function (item) {
                                // Concatenate table row HTML to the rows string
                                rows += `<tr>
                                            <td class="align-middle text-nowrap">${item.lastName}, ${item.firstName}</td>
                                            <td class="align-middle text-nowrap d-none d-md-table-cell">${item.department}</td>
                                            <td class="align-middle text-nowrap d-none d-md-table-cell">${item.jobTitle}</td>
                                            <td class="align-middle text-nowrap d-none d-md-table-cell">${item.location}</td>
                                            <td class="align-middle text-nowrap d-none d-md-table-cell">${item.email}</td>
                                            <td class="text-end text-nowrap">
                                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${item.id}">
                                                    <i class="fa-solid fa-pencil fa-fw"></i>
                                                </button>
                                                <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="${item.id}">
                                                    <i class="fa-solid fa-trash fa-fw"></i>
                                                </button>
                                            </td>
                                        </tr>`;
                            });
                            
                        } else {
                            rows = "<tr><td colspan='5' class='text-center'>No results found</td></tr>";
                        }
                    
                        personnelTableBody.append(rows); // Append the rows string to the table body
                    } else {
                        //console.error("Error fetching personnel data:", result.status.description);
                    }
                    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    //console.error("Error fetching personnel data:", textStatus, errorThrown);
                }
    
            })
        }
      
    }

    // Event listener for filtering results by either location or department
    $("#filterPersonnelByDepartment").change(function () {  
        if (this.value > 0) {          
          $("#filterPersonnelByLocation").val(0);                               
        }
        // apply Filter
        filter();
    })
    
    $("#filterPersonnelByLocation").change(function () {     
        if (this.value > 0) {
          $("#filterPersonnelByDepartment").val(0);   
        }
        // apply Filter
        filter();
    })

});



// Function to search and populate personnel table
function searchPersonnel(searchText) {
  $.ajax({
      url: './libs/php/SearchAll.php',
      type: 'GET',
      data: { txt: searchText },
      success: function (result) {
        if (result.status.code === "200") {
            let personnelTableBody = $("#personnel-tab-pane table tbody");
            personnelTableBody.empty(); // Clear previous search results
        
            var rows = ""; // Initialize an empty string to store table rows
        
            if (result.data.found.length > 0) {
                result.data.found.forEach(function (item) {
                    // Concatenate table row HTML to the rows string
                    rows += `<tr>
                                <td class="align-middle text-nowrap">${item.lastName}, ${item.firstName}</td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">${item.departmentName}</td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">${item.jobTitle}</td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">${item.locationName}</td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">${item.email}</td>
                                <td class="text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${item.id}">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deletePersonnelBtn" data-id="${item.id}">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>`;
                });
            } else {
                rows = "<tr><td colspan='5' class='text-center'>No results found</td></tr>";
            }
        
            personnelTableBody.append(rows); // Append the rows string to the table body
        } else {
            //console.error("Search personnel failed:", result.status.description);
        }        
      },
      error: function (jqXHR, textStatus, errorThrown) {
          //console.error("Error:", textStatus, errorThrown);
      }
  });
}

// Function to search and populate departments table
function searchDepartments(searchText) {
  $.ajax({
    url: './libs/php/searchDepartment.php',
    type: 'GET',
    data: { txt: searchText },
    success: function (result) {
        if (result.status.code === "200") {
            let tableBody = $("#departments-tab-pane table tbody");
            tableBody.empty(); // Clear previous search results
        
            var rows = ""; // Initialize an empty string to store table rows
        
            if (result.data.found.length > 0) {
                result.data.found.forEach(function (item) {
                    // Concatenate table row HTML to the rows string
                    rows += `<tr>
                                <td class="align-middle text-nowrap">${item.name}</td>
                                <td class="align-middle text-nowrap d-none d-md-table-cell">${item.location}</td>
                                <td class="align-middle text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editDepartmentModal" data-id="${item.id}">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${item.id}">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>`;
                });
            } else {
                rows = "<tr><td colspan='3' class='text-center'>No results found</td></tr>";
            }
        
            tableBody.append(rows); // Append the rows string to the table body
        } else {
            //console.error("Search failed:", result.status.description);
        }
        
    },
    error: function (jqXHR, textStatus, errorThrown) {
        //console.error("Error:", textStatus, errorThrown);
    }
  });
}

// Function to search and populate locations table
function searchLocations(searchText) {
  $.ajax({
      url: './libs/php/searchLocation.php',
      type: 'GET',
      data: { txt: searchText },
      success: function (result) {
        if (result.status.code === "200") {
            let tableBody = $("#locations-tab-pane table tbody");
            tableBody.empty(); // Clear previous search results
        
            var rows = ""; // Initialize an empty string to store table rows
        
            if (result.data.found.length > 0) {
                result.data.found.forEach(function (item) {
                    // Concatenate table row HTML to the rows string
                    rows += `<tr>
                                <td class="align-middle text-nowrap">${item.name}</td>
                                <td class="align-middle text-end text-nowrap">
                                    <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editLocationModal" data-id="${item.id}">
                                        <i class="fa-solid fa-pencil fa-fw"></i>
                                    </button>
                                    <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${item.id}">
                                        <i class="fa-solid fa-trash fa-fw"></i>
                                    </button>
                                </td>
                            </tr>`;
                });
            } else {
                rows = "<tr><td colspan='2' class='text-center'>No results found</td></tr>";
            }
        
            tableBody.append(rows); // Append the rows string to the table body
        } else {
            //console.error("Search failed:", result.status.description);
        }
        
      },
      error: function (jqXHR, textStatus, errorThrown) {
          //console.error("Error:", textStatus, errorThrown);
      }
  });
}


// Event listener for search input keyup
$("#searchInp").on("keyup", function () {
  let searchText = $(this).val().trim();
  if (searchText !== "") {
      searchPersonnel(searchText);
      searchDepartments(searchText);
      searchLocations(searchText);
  } else {
      $("#personnel-tab-pane table tbody").empty();
      $("#departments-tab-pane table tbody").empty();
      $("#locations-tab-pane table tbody").empty();
  }
});



// Filter modal  
$("#filterBtn").click(function () {
    
  $("#searchInp").val("");
  $('#filterPersonnelModal').modal("show");

});

$('#filterPersonnelModal').on('show.bs.modal', function () {
    updateFilterOptions();
});

function updateFilterOptions() {
    $.ajax({
        url: './libs/php/getAllDepartments.php',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            let departmentOptions = [];

            $.each(result.data, function() {
                departmentOptions.push(
                    $("<option>", {
                        value: this.id,
                        text: this.name
                    })
                );
            });

            // Prepend "All" option to the departmentOptions array
            departmentOptions.unshift(
                $("<option>", {
                    value: "0",
                    text: "All"
                })
            );

            $("#filterPersonnelByDepartment").empty().append(departmentOptions);
        }
    });

    $.ajax({
        url: './libs/php/getAllLocations.php',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            let locationOptions = [];

            $.each(result.data, function() {
                locationOptions.push(
                    $("<option>", {
                        value: this.id,
                        text: this.name
                    })
                );
            });

            // Prepend "All" option to the locationOptions array
            locationOptions.unshift(
                $("<option>", {
                    value: "0",
                    text: "All"
                })
            );

            $("#filterPersonnelByLocation").empty().append(locationOptions);
        }
    });
}


// Add button click event
$("#addBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
        $("#addPersonnelModal").modal("show");
    } else if ($("#departmentsBtn").hasClass("active")) {
        $("#addDepartmentModal").modal("show");
    } else {
        $("#addLocationModal").modal("show");
    }
});

// AddPersonnelModal show.bs.modal event listener
$('#addPersonnelModal').on('show.bs.modal', function () {
    $(this).find('form')[0].reset();
    // AJAX call to retrieve all departments to populate options
    $.ajax({
        url: './libs/php/getAllDepartments.php',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            // Clear previous options
            $("#addPersonnelDepartment").empty();
            // Create options array
            var options = result.data.map(function(department) {
                return $("<option>", {
                    value: department.id,
                    text: department.name
                });
            });
            // Append options array to select element
            $("#addPersonnelDepartment").append(options);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle error
        }
    });
});

// AddDepartmentModal show.bs.modal event listener
$('#addDepartmentModal').on('show.bs.modal', function () {
    $(this).find('form')[0].reset();
    // AJAX call to retrieve all locations to populate options
    $.ajax({
        url: './libs/php/getAllLocations.php',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            // Clear previous options
            $("#addDepartmentLocation").empty();
            // Create options array
            var options = result.data.map(function(location) {
                return $("<option>", {
                    value: location.id,
                    text: location.name
                });
            });
            // Append options array to select element
            $("#addDepartmentLocation").append(options);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle error
        }
    });
});


// AddLocationModal show.bs.modal event listener
$('#addLocationModal').on('show.bs.modal', function () {
    // Reset the form fields
    $(this).find('form')[0].reset();
});



// Personnel edit modal
$("#editPersonnelModal").on("show.bs.modal", function (e) {
    $.ajax({
        url: "./libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: $(e.relatedTarget).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
        
                $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
                $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
                $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
                $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
                $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

                // Clear previous options
                $("#editPersonnelDepartment").empty();

                // Create options array
                var options = result.data.department.map(function (department) {
                    return $("<option>", {
                        value: department.id,
                        text: department.name
                    });
                });

                // Append options array to select element
                $("#editPersonnelDepartment").append(options);

                $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);

            } else {
                $("#editPersonnelModal .modal-title").replaceWith("Error retrieving data");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith("Error retrieving data");
        }
    });
});

  

// Department Edit modal
$("#editDepartmentModal").on("show.bs.modal", function (e) {
    var departmentID = $(e.relatedTarget).attr("data-id");

    $.ajax({
        url: "./libs/php/getDepartmentByID.php",
        type: "POST",
        dataType: "json",
        data: {
            id: departmentID
        },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {
                var departmentData = result.data.department[0];
                $("#editDepartmentID").val(departmentData.id);
                $("#editDepartmentName").val(departmentData.name);

                // Clear previous options
                $("#editDepartmentLocation").empty();

                // Create options array
                var options = result.data.location.map(function (location) {
                    return $("<option>", {
                        value: location.id,
                        text: location.name
                    });
                });

                // Append options array to select element
                $("#editDepartmentLocation").append(options);
                
                $("#editDepartmentLocation").val(departmentData.locationID);
            } else {
                $("#editDepartmentModal .modal-title").text("Error retrieving data");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editDepartmentModal .modal-title").text("Error retrieving data");
        }
    });
});


//Location Edit Modal
$("#editLocationModal").on("show.bs.modal", function (e) {
  var locationID = $(e.relatedTarget).attr("data-id");

  $.ajax({
      url: "./libs/php/getLocationByID.php",
      type: "POST",
      dataType: "json",
      data: {
          id: locationID
      },
      success: function (result) {
          var resultCode = result.status.code;

          if (resultCode == 200) {
              var locationData = result.data[0];
              $("#editLocationID").val(locationData.id);
              $("#editLocationName").val(locationData.name);
          } else {
              $("#editLocationModal .modal-title").text("Error retrieving data");
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          $("#editLocationModal .modal-title").text("Error retrieving data");
      }
  });
});


//Deleting records
//Are you sure personnel modal
$(document).on("click", ".deletePersonnelBtn", function() {

    $.ajax({
        url: "./libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          var resultCode = result.status.code;
    
          if (resultCode == 200) {
            
            $('#areYouSurePersonnelID').val(result.data.personnel[0].id);
            $("#areYouSurePersonnelName").text(
              result.data["personnel"][0].firstName +
                " " +
                result.data["personnel"][0].lastName
            );
    
            $("#areYouSurePersonnelModal").modal("show");
          } else {
            $("#areYouSurePersonnelModal .modal-title").replaceWith(
              "Error retrieving data"
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#deleteEmployeeName .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      });
});


//Delete department modal
$(document).on("click", ".deleteDepartmentBtn", function() {
    $.ajax({
        url: "./libs/php/checkDepartmentToDelete.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          if (result.status.code == 200) {
            if (result.data.personnelCount == 0) {
              $("#areYouSureDeptID").val(result.data.departmentID);
              $("#areYouSureDeptName").text(result.data.departmentName);
    
              $("#areYouSureDeleteDepartmentModal").modal("show");
            } else {
              $("#cantDeleteDeptName").text(result.data.departmentName);
              $("#personnelCount").text(result.data.personnelCount);
    
              $("#cantDeleteDepartmentModal").modal("show");
            }
          } else {
            $("#exampleModal .modal-title").replaceWith("Error retrieving data");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#exampleModal .modal-title").replaceWith("Error retrieving data");
        }
      });
});

// Delete location modal
$(document).on("click", ".deleteLocationBtn", function() {
    $.ajax({
        url: "./libs/php/checkLocationToDelete.php",
        type: "POST",
        dataType: "json",
        data: {
          id: $(this).attr("data-id") // Retrieves the data-id attribute from the calling button
        },
        success: function (result) {
          if (result.status.code == 200) {
            if (result.data.departmentCount == 0) {
              $("#areYouSureLocationID").val(result.data.locationID);
              $("#areYouSureLocationName").text(result.data.locationName);
    
              $("#areYouSureDeleteLocationModal").modal("show");
            } else {
              $("#cantDeleteLocationName").text(result.data.locationName);
              $("#employeeCount").text(result.data.departmentCount);
    
              $("#cantDeleteLocationModal").modal("show");
            }
          } else {
            $("#exampleModal .modal-title").replaceWith("Error retrieving data");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          $("#exampleModal .modal-title").replaceWith("Error retrieving data");
        }
      });
});

