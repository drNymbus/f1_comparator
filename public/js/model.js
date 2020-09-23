class Selector {
    constructor (objs) {
        if (objs.length < 2) throw 'Selector : OBJS length < 2';

        this.div = document.getElementsByClassName('selector')[0];
        this.checkboxes = [];
        this.index1 = 0;
        this.index2 = 1;

        this.names = [];
        for (var i=0; i < objs.length; i++) { this.names.push(objs[i]["driver"]); }
    }

    createCheckboxes() {
        //create table
        var table = document.createElement('table');

        for (var i=0; i < this.names.length; i++) {
            //create tr
            var tr = document.createElement('tr');

            //create Checkbox (+ fill attrs)
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = this.names[i];
            if (i == this.index1 || i == this.index2) checkbox.checked = true;
            checkbox.onclick = function () {
                    var checkboxes = document.forms["form_name"]["check[]"];
                    console.log(checkboxes);
                    var ccheckboxes = []; // indexes of checked checkboes (= ccheckboxes)
                    var limit = 2;
                    for (var i = 0; i < ccheckboxes.length; i++) {
                        count += (ccheckboxes[i].checked) ? 1 : 0;
                    }

                    if (ccheckboxes.length > limit) {
                        ccheckboxes[0].checked = false;
                    }
            }

            //create label associated with checkbox;
            var label = document.createElement('label');
            label.setAttribute("for", this.names[i]);
            label.innerHTML= this.names[i];

            //add checkbox to tr
            tr.appendChild(label);
            tr.appendChild(checkbox);
            this.checkboxes.push(checkbox);

            //add tr to table
            table.appendChild(tr);
        }

        //add table to div
        this.div.appendChild(table);
        return this;

    }
}

class Comparator {
    constructor (obj1, obj2) {

    }
}
