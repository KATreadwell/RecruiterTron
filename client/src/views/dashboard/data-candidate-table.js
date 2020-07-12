let jsondataCandidate = [
    {
        "name": "Batman",
        "phone": "310-222-2222",
        "email": "bats@gmail.com",
        "street": "1234 Bat Street",
        "city": "Los Angeles",
        "state": "CA",
        "zip": "90027",
        "experience": "5+ years",
        "qualifications": ["Firearms Permit", "Guard Card", "Prior Law Enforcement Experience", "Transportation", "Driver's License"],
        "commute": "10",
        "status": "interview",
        "ranking": "5"
    }
]

jsondataCandidate[0].address = `${jsondataCandidate[0].street}\n,  ${jsondataCandidate[0].city}, ${jsondataCandidate[0].state}, ${jsondataCandidate[0].zip}`;

console.log(jsondataCandidate);

export { jsondataCandidate };

