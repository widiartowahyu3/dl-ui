import {inject, bindable, BindingEngine, observable, computedFrom} from 'aurelia-framework'
var moment = require('moment');
var momentToMillis = require('../../../../utils/moment-to-millis')

@inject(BindingEngine, Element)
export class DataForm {
    @bindable readOnlyInput = false;
    @bindable readOnlyOutput = false;
    @bindable readOnly = false;
    @bindable output = false;
    @bindable data = {};
    @bindable error = {};
    shiftOptions = ['Shift I: 06.00 – 14.00', 'Shift II: 14.00 – 22.00', 'Shift III: 22:00 – 06.00'];

    constructor(bindingEngine, element) {
        this.bindingEngine = bindingEngine;
        this.element = element;
    }

    bind()
    {
        this.timeInput = this.data.timeInput ? moment(this.data.timeInput) : this._adjustMoment();
        if(this.data.timeOutput)
            this.timeOutput = moment(this.data.timeOutput);
        // var tempTimeInput = moment(this.timeInput);
        // var tempTimeOutput = moment(this.timeOutput);
        // this.data.timeInput = momentToMillis(tempTimeInput);
        // this.data.timeOutput = momentToMillis(tempTimeOutput);

        if (this.data.dateInput)
            this.data.dateInput = moment(this.data.dateInput).format("YYYY-MM-DD");
        if (this.data.dateOutput)
            this.data.dateOutput = moment(this.data.dateOutput).format("YYYY-MM-DD");
    }

    get isFilterMachine(){
        this.filterMachine = {};
        if(this.data.kanban)
        {
            var steps = [];
            for(var step of this.data.kanban.instruction.steps){
                steps.push(step.process);
            }
            this.filterMachine = {
                "step.process" : { "$in" : steps }
            };
        }
        return this.filterMachine;
    }
    
    kanbanChanged(e){
        var selectedKanban = e.detail;
        if(selectedKanban){
            this.data.kanbanId = selectedKanban._id;
            if(selectedKanban.instruction){
                var steps = [];
                for(var step of selectedKanban.instruction.steps){
                    steps.push(step.process);
                }
                this.filterMachine = {
                    "step.process" : { "$in" : steps }
                };
                this.data.input = selectedKanban.cart.qty;
            }
        }
    }

    machineChanged(e) {
        var selectedMachine = e.detail || {};
        if (selectedMachine)
            this.data.machineId = selectedMachine._id ? selectedMachine._id : "";
    }

    timeInputChanged(e)
    {
        var tempTimeInput = e.detail;
        if (tempTimeInput){
            tempTimeInput = this._adjustMoment(tempTimeInput);
            this.data.timeInput = momentToMillis(tempTimeInput);
        }
        else{
            delete this.data.timeInput;
        }
    }

    timeOutputChanged(e)
    {
        var tempTimeOutput = e.detail;
        if (tempTimeOutput){
            tempTimeOutput = this._adjustMoment(tempTimeOutput);
            this.data.timeOutput = momentToMillis(tempTimeOutput);
        }
        else{
            delete this.data.timeOutput;
        }
    }

    _adjustMoment(timeInMoment){
        if (!timeInMoment)
            timeInMoment = moment();
        timeInMoment.set('year', 1970);
        timeInMoment.set('month', 0);
        timeInMoment.set('date', 1);   
        return timeInMoment;     
    }
}