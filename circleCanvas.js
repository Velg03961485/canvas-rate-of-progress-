// {id, progress, cax, cah}
var cricleChart = function (val) {
  let ctx = wx.createCanvasContext(val.id);
  let per = parseFloat((val.finish * 100 / (val.target || 1)).toFixed(2));
  let percent = per >= 100 ? 100 : per;
  let radius = val.cax / 2 - 20,
    circleX = val.cax / 2,
    circleY = val.cah / 2 - 40,
    lineWidth = 6,
    fontSize = 24;
  ctx.clearRect(0, 0, val.cax, val.cah);

  function drawCircle(cx, cy, r) {   //绘制下面的小三角
    let chtGrad = ctx.createLinearGradient(
      circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
    );
    chtGrad.addColorStop(0.0, '#c4cdf2');
    chtGrad.addColorStop(1.0, '#c4cdf2');
    ctx.strokeStyle = chtGrad;

    ctx.beginPath();
    ctx.setLineWidth(1);
    ctx.strokeStyle = 'transparent';
    ctx.moveTo(circleX - 7, circleY + radius);
    ctx.lineTo(circleX + 7, circleY + radius);
    ctx.lineTo(circleX, circleY + radius + 8);
    ctx.lineTo(circleX - 7, circleY + radius);
    percent <= 50 ? ctx.fillStyle = '#c4cdf2' : percent < 100 ? ctx.fillStyle = '#FFC608' : ctx.fillStyle = '#FFd137';
    ctx.fill();
    ctx.stroke();

    //灰色圆弧
    ctx.beginPath();
    ctx.setLineWidth(3);
    ctx.strokeStyle = '#c4cdf2';
    ctx.setLineCap("butt");
    ctx.arc(cx, cy, r, Math.PI * 1.5, Math.PI * 3.5);
    ctx.stroke();

    ctx.beginPath();    //中间的横线
    ctx.setLineWidth(0.6);
    ctx.strokeStyle = '#ffffff';
    ctx.moveTo(cx - 25, cy - 7);
    ctx.lineTo(cx + 25, cy - 7);
    ctx.stroke();

    ctx.draw(true);
  };

  function sector(cx, cy, r, endAngle) {
    ctx.beginPath();
    ctx.setLineWidth(lineWidth);
    let linGrad = ctx.createLinearGradient(
      circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
    );

    if (percent >= 100) {
      linGrad.addColorStop(0.0, '#FFd137');
      linGrad.addColorStop(1.0, '#ffffff');

    } else {
      linGrad.addColorStop(0.0, '#FFC608');
      linGrad.addColorStop(1.0, '#ffffff');
    }

    ctx.strokeStyle = linGrad;

    //  圆弧两端的样式
    ctx.lineCap = 'round';

    // 圆弧
    ctx.arc(
      cx, cy, r,
      1.5 * Math.PI,
      1.5 * Math.PI + endAngle / 50 * Math.PI,
      false
    );
    ctx.stroke();
    ctx.draw(true);
  };

  function setFont() {
    ctx.font = '15px "Univers LT 47 CondensedLt"';
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    percent < 100 ? ctx.setFillStyle('#ffffff') : ctx.setFillStyle('#ffffff');
    ctx.fillText(percent + '%', circleX, circleY - 18);

    ctx.font = '11px "Univers LT 47 CondensedLt"';   //标题文体样式
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFillStyle('#ffffff');
    ctx.fillText(val.title, circleX, circleY + 5);


    ctx.font = '15px "Univers LT 47 CondensedLt"';    //目标文体样式
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFillStyle('#ffe17f');
    ctx.fillText(val.target, circleX, circleY + 20);


    ctx.font = '12px "Univers LT 47 CondensedLt"';   //完成文体样式
    ctx.setTextAlign('center');
    ctx.setTextBaseline('middle');
    ctx.setFillStyle('#ffffff');
    ctx.fillText(val.finish, circleX, circleY * 2 + 10);
    ctx.draw(true);
  }

  drawCircle(circleX, circleY, radius);
  sector(circleX, circleY, radius, percent);
  setFont();
}

// export default drawProgress
module.exports = cricleChart;