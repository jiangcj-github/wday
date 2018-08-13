import React, { Component } from "react";
import MonthView from "./MonthView.jsx";
import DecadeView from "./DecadeView.jsx";
import SetMonthView from "./SetMonthView.jsx";
import exchangeViewBase from "../../../components/ExchangeViewBase";

export default class Calendar extends exchangeViewBase {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day:  new Date().getDate(),
      view: "month",
      showCalendar: 'none',
      calendarActive: false,
      istarget: false,
      inputValue: '',
      clickActive: 0,
    };
    this.hide = () => {
      if (this.state.istarget) {
        this.state.istarget = false;
        return;
      };
      if (this.state.showCalendar === 'none') return;
      this.setState({
        showCalendar: 'none'
      });
    }
  }

  componentDidMount(){
    // console.log(111, typeof this.props.startInputTime)
    let statTime = new Date(this.props.startInputTime * 1000), endTime = new Date(this.props.endInputTime * 1000)
    document.addEventListener('click', this.hide)
    this.props.startInputTime && this.setState({
      inputValue: `${statTime.getFullYear()}-${statTime.getMonth() + 1}-${statTime.getDate()}`
    })
    this.props.endInputTime && this.setState({
      inputValue: `${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()}`
    })
  }
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.startInputTime === this.props.startInputTime && nextProps.endInputTime === this.props.endInputTime ) return;
    let statTime = new Date(nextProps.startInputTime * 1000),
      endTime = new Date(nextProps.endInputTime * 1000);
    nextProps.startInputTime && this.setState({
        inputValue: `${statTime.getFullYear()}-${statTime.getMonth() +
          1}-${statTime.getDate()}`
      });
    nextProps.endInputTime && this.setState({
        inputValue: `${endTime.getFullYear()}-${endTime.getMonth() +
          1}-${endTime.getDate()}`
      });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hide)
  }

  //变为下一月
  goNextMonth() {
    //如果当前是12月，那么下一月就是下一年的1月
    if (this.state.month == 12) {
      this.setState({
        year: this.state.year + 1,
        month: 1,
        showCalendar: 'block',
        istarget: true
      });
    } else {
      this.setState({
        month: this.state.month + 1,
        showCalendar: 'block',
        istarget: true
      });
    }
  };

  //变为上一月
  goPrevMonth() {
    if (this.state.month == 1) {
      this.setState({
        year: this.state.year - 1,
        month: 12,
        showCalendar: 'block',
        istarget: true
      });
    } else {
      this.setState({
        month: this.state.month - 1,
        showCalendar: 'block',
        istarget: true
      });
    }
  };

  goNextYear() {
    this.setState({
      year: this.state.year + 1,
      showCalendar: 'block',
      istarget: true
    });
  };

  goPrevYear() {
    this.setState({
      year: this.state.year - 1,
      showCalendar: 'block',
      istarget: true
    });
  };

  goNextTenYear() {
    this.setState({
      year: this.state.year + 10,
      showCalendar: 'block',
      istarget: true
    });
  };

  goPreTenYear() {
    this.setState({
      year: this.state.year - 10,
      showCalendar: 'block',
      istarget: true
    });
  };

  setYear(year) {
    this.setState({
      year,
      view: "changeMonth",
      showCalendar: 'block',
      istarget: true
    });
  };

  setMonth(month) {
    this.setState({
      month,
      view: "month",
      showCalendar: 'block',
      istarget: true
    });
  };

  setDay(day) {
    let time = day === this.intl.get('today') ? `${this.state.year}-${this.state.month}-${new Date().getDate()}` : `${this.state.year}-${this.state.month}-${day}`
    this.setState({
      inputValue: time,
      clickActive: day
    });
    this.props.onChange(time)
  };

  showCalendar(state) {
    this.setState({
      showCalendar: 'block',
      istarget: true,
      calendarActive: true
    });
  };

  render() {
    return (
      <div className="calendar-wrap">
        <div className={`${this.state.calendarActive ? "active" : ""} input-wrap`}>
          <input type="text"
                 placeholder="选择日期"
                 onFocus={this.showCalendar.bind(this)}
                 onBlur={() => {this.setState({calendarActive: false})}}
                 value={this.state.inputValue}/>
                 {/*value="dddd"/>*/}
        </div>
        <div className="calendar" style={{display: this.state.showCalendar}}>
          {this.state.view == "month" ? (
            <h3>
              <img src={this.$imagesMap.$calendar_preYear} alt="" onClick={this.goPrevYear.bind(this)} className="pre-year-img"/>
              <img src={this.$imagesMap.$calendar_preMonth} alt=""  onClick={this.goPrevMonth.bind(this)} className="pre-month-img"/>
              <i className="year-i" onClick={() => {this.setState({view: "decade", showCalendar: "block", istarget: true})}}>{this.state.year}{this.intl.get('yearSp')}</i>
              <i onClick={() => {this.setState({view: "changeMonth", showCalendar: "block", istarget: true})}}>{this.state.month}{this.intl.get('month')}</i>
              <img src={this.$imagesMap.$calendar_nextMonth} alt=""  onClick={this.goNextMonth.bind(this)} className="next-month-img"/>
              <img src={this.$imagesMap.$calendar_nextYear} alt="" onClick={this.goNextYear.bind(this)} className="next-year-img"/>
            </h3>
          ) : (this.state.view == "decade" ? (
            <h3>
              <img src={this.$imagesMap.$calendar_preMonth} alt="" onClick={this.goPreTenYear.bind(this)} className="pre-month-img"/>
              {this.state.year - (this.state.year % 10)}{this.intl.get('year')} - {this.state.year - (this.state.year % 10) + 9}{this.intl.get('year')}
              <img src={this.$imagesMap.$calendar_nextMonth} alt="" onClick={this.goNextTenYear.bind(this)} className="next-month-img"/>
            </h3>
          ) : (
            <h3>{this.state.year}{this.intl.get('year')}</h3>
          ))}

          {this.state.view == "month" ? (
            <MonthView year={this.state.year}
                       month={this.state.month}
                       day={this.state.day}
                       setDay={this.setDay.bind(this)}
                       index={this.state.clickActive}
                       isStart={this.props.startTime}
                       isEnd={this.props.endTime}/>
          ) : (this.state.view == "decade" ? (
            <DecadeView
              year={this.state.year}
              setYear={this.setYear.bind(this)}
            />
          ) : (
            <SetMonthView
              month={this.state.month}
              setMonth={this.setMonth.bind(this)}
            />
          ))}
        </div>
      </div>
    );
  }
}
