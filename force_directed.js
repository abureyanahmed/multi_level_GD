function is_comment(str)
{
	if(str[0]=='#')return true;
	return false;
}
// Given three colinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(px, py, qx, qy, rx, ry)
{
    if (qx <= Math.max(px, rx) && qx >= Math.min(px, rx) && qy <= Math.max(py, ry) && qy >= Math.min(py, ry))
       return true;
 
    return false;
}
//alert(onSegment(0, 0, 1, 2, 3, 3));
// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(px, py, qx, qy, rx, ry)
{
    // See http://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    val = (qy - py) * (rx - qx) - (qx - px) * (ry - qy);
 
    if (val == 0) return 0;  // colinear
    //alert(val);
 
    return (val > 0)? 1: 2; // clock or counterclock wise
}
// The main function that returns true if line segment 'p1q1'
// and 'p2q2' intersect.
function doIntersect(p1x, p1y, q1x, q1y, p2x, p2y, q2x, q2y)
{
    // Find the four orientations needed for general and
    // special cases
    o1 = orientation(p1x, p1y, q1x, q1y, p2x, p2y);
    o2 = orientation(p1x, p1y, q1x, q1y, q2x, q2y);
    o3 = orientation(p2x, p2y, q2x, q2y, p1x, p1y);
    o4 = orientation(p2x, p2y, q2x, q2y, q1x, q1y);
 
    //alert("o1="+o1+",o2="+o2+",o3="+o3+",o4="+o4);
    if(o1==0 || o2==0 || o3==0 || o4==0)return false;
    // General case
    if (o1 != o2 && o3 != o4)
        return true;
 
    // Special Cases
    // p1, q1 and p2 are colinear and p2 lies on segment p1q1
    //if (o1 == 0 && onSegment(p1x, p1y, p2x, p2y, q1x, q1y)) return true;
 
    // p1, q1 and p2 are colinear and q2 lies on segment p1q1
    //if (o2 == 0 && onSegment(p1x, p1y, q2x, q2y, q1x, q1y)) return true;
 
    // p2, q2 and p1 are colinear and p1 lies on segment p2q2
    //if (o3 == 0 && onSegment(p2x, p2y, p1x, p1y, q2x, q2y)) return true;
 
     // p2, q2 and q1 are colinear and q1 lies on segment p2q2
    //if (o4 == 0 && onSegment(p2x, p2y, q1x, q1y, q2x, q2y)) return true;
 
    return false; // Doesn't fall in any of the above cases
}
//alert(doIntersect(0, 0, 3, 0, 1, -1, 1, 1));
function slope(x1, y1, x2, y2) {
            if (x1 == x2) return false;
            return (y1 - y2) / (x1 - x2);
        }
function yInt(x1, y1, x2, y2) {
            //if (x1 === x2) return y1 === 0 ? 0 : false;
            if (y1 === y2) return y1;
            //return y1 - this.slope(x1, y1, x2, y2) * x1 ;
            return y1 - slope(x1, y1, x2, y2) * x1 ;
        }
function getXInt(x1, y1, x2, y2) {
            var slope;
            if (y1 === y2) return x1 == 0 ? 0 : false;
            if (x1 === x2) return x1;
            //return (-1 * ((slope = this.slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
            return (-1 * ((slope = slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
        }
function get_cosine_prod(x1,y1,x2,y2)
{
    return x1*x2 + y1*y2;
}
function get_angle(x1,y1,x2,y2)
{
    //alert(get_cosine_prod(x1,y1,x2,y2)+","+Math.pow(get_cosine_prod(x1,y1,x1,y1),.5)+","+Math.pow(get_cosine_prod(x2,y2,x2,y2),.5));
    return Math.round(Math.min(Math.acos((get_cosine_prod(x1,y1,x2,y2))/(Math.pow(get_cosine_prod(x1,y1,x1,y1),.5)*Math.pow(get_cosine_prod(x2,y2,x2,y2),.5))),Math.PI-Math.acos((get_cosine_prod(x1,y1,x2,y2))/(Math.pow(get_cosine_prod(x1,y1,x1,y1),.5)*Math.pow(get_cosine_prod(x2,y2,x2,y2),.5))))*100)/100.00;
}
function getIntersection(x11, y11, x12, y12, x21, y21, x22, y22) {
            var slope1, slope2, yint1, yint2, intx, inty;
            if (x11 == x21 && y11 == y21) return [x11, y11];
            if (x12 == x22 && y12 == y22) return [x12, y22];

            /*slope1 = this.slope(x11, y11, x12, y12);
            slope2 = this.slope(x21, y21, x22, y22);*/
            slope1 = slope(x11, y11, x12, y12);
            slope2 = slope(x21, y21, x22, y22);
            //alert("slp1="+slope1+",slp2="+slope2);
            if (slope1 === slope2) return false;

            /*yint1 = this.yInt(x11, y11, x12, y12);
            yint2 = this.yInt(x21, y21, x22, y22);*/
            yint1 = yInt(x11, y11, x12, y12);
            yint2 = yInt(x21, y21, x22, y22);
            if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

            if(x11 == x12)return [x11, slope2*x11+yint2];
            if(x21 == x22)return [x21, slope1*x21+yint1];
            if(y11 == y12)return [(y11-yint2)/slope2,y11];
            if(y21 == y22)return [(y21-yint1)/slope1,y21];

            if (slope1 === false) return [y21, slope2 * y21 + yint2];
            if (slope2 === false) return [y11, slope1 * y11 + yint1];
            intx = (yint1 - yint2)/ (slope2-slope1);
            return [intx, slope1 * intx + yint1];
        }
/*var x = [];
var y = [];
var N = 0;
var u = [];
var v = [];*/
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function generate_path(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    str = str + s + '\n';
    for(var i=0;i<s;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    for(var i=0;i<s-1;i++)
    {
        str = str + i + " " + (i+1);
        if(i<s-2)str = str + '\n';
    }
    return str;
}
function generate_cycle(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    str = str + s + '\n';
    for(var i=0;i<s;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    for(var i=0;i<s-1;i++)
    {
        str = str + i + " " + (i+1) + '\n';
    }
    str = str + (s-1) + " " + 0;
    return str;
}
function generate_grid(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    s = parseInt(s);
    s2 = s*s;
    str = str + s2 + '\n';
    for(var i=0;i<s2;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    var count_edges = 0;
    for(var i=0;i<s;i++)
    {
        for(var j=0;j<s;j++)
        {
            cur = i*s+j;
            if(Math.floor((cur+1)/s)==i)
            {
                str = str + cur + " " + (cur+1);
                count_edges = count_edges + 1;
                if(cur<s2-2)str = str + '\n';
            }
            if((cur+s)<s2)
            {
                str = str + cur + " " + (cur+s);
                count_edges = count_edges + 1;
                if(cur<s2-2)str = str + '\n';
            }
        }
    }
    /*if(document.getElementById("embedding_selector").value == "planar_drawing")
        alert(count_edges);*/
    return str;
}
function generate_complete(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    s = parseInt(s);
    str = str + s + '\n';
    for(var i=0;i<s;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    for(var i=0;i<s;i++)
    {
        for(var j=i+1;j<s;j++)
        {
            str = str + i + " " + j;
            if(!((i==s-2)&&(j==s-1)))str = str + '\n';
        }
    }
    return str;
}
function generate_utility(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    var k=0;
    for(k=0;k<s.length;k++)
    {
        if(s[k]==',')
            break;
    }
    var houses = parseInt(s.substring(0,k));
    var utilities = parseInt(s.substring(k+1,s.length));
    s= houses+utilities;
    str = str + s + '\n';
    for(var i=0;i<s;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    //var houses = getRandomInt(1,s);
    for(var i = 0; i < houses; i++)
    {
        for(var j = houses; j < s; j++)
        {
            str = str + i + " " + j;
            if(!((i==houses-1)&&(j==s-1)))
                str = str + '\n';
        }
    }
    alert(str);
    return str;
}
function generate_cageish(s)
{
    //var canvas = document.getElementById("myCanvas");
    var str = "";
    s = parseInt(s);
    str = str + s + '\n';
    for(var i=0;i<s;i++)
    {
        //str = str + getRandomInt(0,canvas.width) + " " + getRandomInt(0,canvas.height) + '\n';
        str = str + getRandomInt(0,window_width) + " " + getRandomInt(0,window_height) + '\n';
    }
    for(var i = 0; i < s - 1; i ++)
    {
        str = str + i + " " + (i+1) + '\n';
    }
    str = str + (s-1) + " 0" + '\n';
    //var spacing = getRandomInt(1,s+1);
    for(var j = 0; j < s; j++)
    {
        for(var i = 0; i < s -1; i+=2)
        {
            str = str + j + " " + i;
            if(!((j==s-1)&&(i>=(s-3))))
                str = str + '\n';
        }
    }
    alert(str);
    return str;
}
function generate_robertson()
{
    return "19\n11 7\n27 36\n28 32\n22 30\n27 37\n16 35\n8 10\n31 27\n11 19\n8 6\n5 7\n21 5\n36 17\n31 6\n12 1\n3 6\n20 5\n0 15\n1 27\n0 14\n0 5\n0 11\n0 8\n1 4\n1 7\n1 10\n1 13\n2 3\n2 12\n2 6\n2 9\n3 4\n3 14\n3 18\n4 5\n4 17\n5 16\n5 6\n6 15\n6 7\n7 18\n7 8\n8 17\n8 9\n9 10\n9 16\n10 11\n10 15\n11 12\n11 18\n12 13\n12 17\n13 14\n13 16\n14 15\n15 17\n16 18";
}
function generate_peterson()
{
    return "10\n11 7\n27 36\n28 32\n22 30\n27 37\n16 35\n8 10\n31 27\n11 19\n8 6\n0 1\n0 3\n0 5\n1 2\n1 8\n2 4\n2 7\n3 6\n3 7\n4 6\n4 5\n5 9\n6 8\n7 9\n8 9";
}
function generate_pappus()
{
    return "18\n31 25\n5 2\n22 8\n24 26\n35 1\n0 17\n24 26\n27 11\n7 25\n16 28\n15 1\n9 29\n4 33\n15 18\n8 7\n25 2\n32 19\n26 9\n0 1\n0 2\n0 3\n1 4\n1 15\n2 7\n2 8\n3 6\n3 17\n4 9\n4 5\n5 11\n5 6\n6 10\n7 12\n7 10\n8 9\n8 14\n9 13\n10 13\n11 12\n11 14\n12 15\n13 16\n14 17\n15 16\n16 17";
}
function generate_mobius_kantor()
{
    return "16\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n24 21\n11 22\n8 7\n25 18\n0 1\n0 7\n0 8\n1 2\n1 9\n2 3\n2 10\n3 4\n3 11\n4 12\n4 5\n5 6\n5 13\n6 7\n6 14\n7 15\n8 11\n8 13\n9 12\n9 14\n10 13\n10 15\n11 14\n12 15";
}
function generate_mcgee()
{
    return "24\n7 1\n41 26\n34 8\n24 14\n35 13\n24 5\n12 2\n3 23\n7 1\n40 4\n15 1\n45 5\n40 21\n27 6\n8 7\n25 2\n8 19\n2 33\n19 13\n3 21\n31 32\n1 24\n29 17\n44 43\n0 1\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 0\n0 8\n1 9\n2 10\n3 11\n4 12\n5 13\n6 14\n7 15\n8 16\n9 17\n10 18\n11 19\n12 20\n13 21\n14 22\n15 23\n16 21\n17 20\n18 23\n19 22\n18 21\n17 22\n16 19\n23 20\n15 11\n8 12\n9 13\n10 14";
}
function generate_hoffman()
{
    return "16\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n24 21\n11 22\n8 7\n25 18\n0 1\n0 2\n0 4\n0 5\n1 6\n1 3\n1 8\n2 3\n2 7\n2 9\n3 10\n3 11\n4 6\n4 12\n4 8\n5 7\n5 9\n5 12\n6 10\n6 13\n7 10\n7 13\n8 11\n8 14\n9 11\n9 14\n10 15\n11 15\n12 13\n12 14\n13 15\n13 14";
}
function generate_heawood()
{
    return "14\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n24 21\n11 22\n0 1\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8\n8 9\n9 10\n10 11\n11 12\n12 13\n13 0\n0 5\n1 10\n2 7\n3 12\n4 9\n6 11";
}
function generate_grotzsch()
{
    return "11\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n0 1\n0 3\n0 4\n0 5\n1 2\n1 7\n1 9\n2 3\n2 6\n3 8\n3 10\n4 9\n4 6\n5 6\n5 10\n6 7\n6 8\n7 10\n8 9\n9 10";
}
function generate_franklin()
{
    return "12\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n0 1\n0 11\n0 7\n1 2\n1 6\n2 3\n2 9\n3 4\n3 8\n4 5\n4 11\n5 6\n5 10\n6 7\n7 8\n8 9\n9 10\n10 11";
}
function generate_folkman()
{
    return "20\n7 9\n33 18\n10 32\n24 38\n3 29\n0 5\n12 2\n27 23\n7 9\n0 12\n23 9\n29 37\n0 13\n19 38\n16 15\n17 26\n32 27\n10 33\n19 29\n19 21\n0 1\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8\n8 9\n9 0\n0 16\n0 19\n1 10\n1 11\n2 15\n2 17\n3 11\n3 12\n4 16\n4 18\n5 12\n5 13\n6 17\n6 19\n7 13\n7 14\n8 18\n8 15\n9 10\n9 14\n10 16\n10 19\n11 15\n11 17\n12 16\n12 18\n13 17\n13 19\n14 15\n14 18";
}
function generate_flower_snark()
{
    return "20\n7 9\n33 18\n10 32\n24 38\n3 29\n0 5\n12 2\n27 23\n7 9\n0 12\n23 9\n29 37\n0 13\n19 38\n16 15\n17 26\n32 27\n10 33\n19 29\n19 21\n0 1\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8\n8 9\n9 10\n10 11\n11 12\n12 13\n13 14\n14 0\n0 15\n1 11\n2 7\n3 16\n4 14\n5 10\n6 17\n8 13\n7 18\n12 19\n15 16\n16 17\n17 18\n18 19\n19 15";
}
function generate_dodecahedral()
{
    return "20\n7 9\n33 18\n10 32\n24 38\n3 29\n0 5\n12 2\n27 23\n7 9\n0 12\n23 9\n29 37\n0 13\n19 38\n16 15\n17 26\n32 27\n10 33\n19 29\n19 21\n0 1\n0 4\n0 5\n1 2\n1 7\n2 3\n2 9\n3 4\n3 11\n4 13\n5 6\n5 14\n6 7\n6 15\n7 8\n8 9\n8 16\n9 10\n10 11\n10 17\n11 12\n12 13\n12 18\n13 14\n14 19\n15 16\n16 17\n17 18\n18 19\n19 15";
}
function generate_desargues()
{
    return "20\n7 9\n33 18\n10 32\n24 38\n3 29\n0 5\n12 2\n27 23\n7 9\n0 12\n23 9\n29 37\n0 13\n19 38\n16 15\n17 26\n32 27\n10 33\n19 29\n19 21\n0 1\n0 10\n1 2\n1 11\n2 3\n2 12\n3 4\n3 13\n4 5\n4 14\n5 6\n5 15\n6 7\n6 16\n7 8\n7 17\n8 9\n8 18\n9 0\n9 19\n10 13\n10 17\n11 18\n11 14\n12 19\n12 15\n13 16\n14 17\n15 18\n16 19";
}
function generate_clebsch()
{
    return "16\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n24 21\n11 22\n8 7\n25 18\n0 3\n0 5\n0 9\n0 12\n0 4\n1 13\n1 5\n1 6\n1 8\n1 4\n2 3\n2 4\n2 8\n2 7\n2 15\n3 13\n3 14\n3 6\n4 10\n4 11\n5 14\n5 15\n5 7\n6 9\n6 11\n6 7\n7 10\n7 12\n8 9\n8 12\n8 14\n9 15\n9 10\n10 13\n10 14\n11 14\n11 15\n11 12\n12 13\n13 15";
}
function generate_chvatal()
{
    return "12\n7 17\n25 10\n2 8\n24 30\n3 13\n24 21\n12 2\n19 7\n23 17\n24 20\n15 17\n13 5\n0 1\n0 3\n0 4\n0 5\n1 2\n1 8\n1 10\n2 3\n2 6\n2 7\n3 9\n3 11\n4 6\n4 7\n4 10\n5 6\n5 7\n5 11\n6 8\n7 9\n8 9\n8 11\n9 10\n10 11";
}
function generate_cage()
{
    return "25\n7 49\n23 8\n30 22\n44 28\n23 9\n40 15\n42 42\n37 3\n27 29\n40 12\n3 19\n9 7\n10 33\n49 28\n16 35\n47 26\n12 17\n10 33\n29 49\n29 21\n17 22\n43 36\n35 45\n28 41\n44 7";
}
function generate_brinkmann()
{
    return "21\n7 7\n23 20\n34 20\n30 8\n29 1\n6 23\n0 20\n21 5\n37 25\n4 10\n39 19\n15 35\n22 3\n27 30\n14 37\n25 38\n14 13\n8 33\n7 1\n21 39\n13 14\n0 5\n0 2\n0 7\n0 8\n1 3\n1 6\n1 8\n1 9\n2 4\n2 9\n2 10\n3 5\n3 10\n3 11\n4 6\n4 11\n4 12\n5 12\n5 13\n6 13\n6 7\n7 15\n7 20\n8 14\n8 16\n9 15\n9 17\n10 16\n10 18\n11 17\n11 19\n12 18\n12 20\n13 19\n13 14\n14 17\n14 18\n15 18\n15 19\n16 19\n16 20\n17 20";
}
function generate_blanusa_snark()
{
    return "18\n31 25\n5 2\n22 8\n24 26\n35 1\n0 17\n24 26\n27 11\n7 25\n16 28\n15 1\n9 29\n4 33\n15 18\n8 7\n25 2\n32 19\n26 9\n0 2\n0 1\n0 10\n1 7\n1 3\n2 5\n2 6\n3 4\n3 6\n4 5\n4 8\n5 7\n6 9\n7 17\n8 11\n8 9\n9 13\n10 12\n10 16\n11 14\n11 15\n12 13\n12 14\n13 15\n15 16\n14 17\n16 17";
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function parse_input_string(val, generate_random, window_width, window_height)
{
    var x = [];
    var y = [];
    var N = 0;
    var u = [];
    var v = [];

    // From the string, get the values
    var lines = val.split('\n');
    var i = 0;
    for(;is_comment(lines[i]);i++){}
    N = parseInt(lines[i]);
    i++;
    //ctx.fillText(N+"",10,50);
    for(var j=0;j<N;j++)
    {
        for(;is_comment(lines[i]);i++){}
        arr = lines[i].split(' ');
        x.push(parseInt(arr[0]));
        y.push(parseInt(arr[1]));
        i++;
    }
    for(;i<lines.length;i++)
    {
        for(;is_comment(lines[i]);i++){}
        arr = lines[i].split(' ');
        if(isNumeric(arr[0]))
        {
          u.push(parseInt(arr[0]));
          v.push(parseInt(arr[1]));
        }
    }
    if(generate_random)
    {
        //var canvas = document.getElementById("myCanvas");
        for(var j=0;j<N;j++)
        {
            x[j]=getRandomInt(0, window_width);
            y[j]=getRandomInt(0, window_height);
        }
    }

    var result = {};
    result["x"] = x;
    result["y"] = y;
    result["N"] = N;
    result["u"] = u;
    result["v"] = v;
    return result;
}
var graph_class = "";
function read_input_and_draw(generate_random, graph_class, window_width, window_height, task, iterations, parameters, K_in, temperature_in, cooling_id, file_name_prefix, output_file_prefix, is_repulsion_crossing_enabled){
    var val = "";
    //graph_class = document.getElementById("graph_class_id").value;
    if(graph_class=="None")
    {
        //val = document.getElementById("input_text").value;
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(file_name_prefix)
            });
            lineReader.on('line', function (line) {
                //console.log('Line from file:', line);
                val = val + line + "\n";
            }).on('close', function() {
                // call appropriate function
                console.log(val);
                var result = parse_input_string(val, generate_random, window_width, window_height);
                if(task == "force directed")
                {
                    force_directed(window_width, window_height, iterations, parameters, K_in, temperature_in, cooling_id, result["x"], result["y"], result["N"], result["u"], result["v"], output_file_prefix, is_repulsion_crossing_enabled);
                }
            });
    }
    /*else
    {
        var s = document.getElementById("graph_size").value;
        if(graph_class == "Path")
        {
            val = generate_path(s);
        }
        else if(graph_class == "Cycle")
        {
            val = generate_cycle(s);
        }
        else if(graph_class == "Grid")
        {
            val = generate_grid(s);
        }
        else if(graph_class == "Complete")
        {
            val = generate_complete(s);
        }
        else if(graph_class == "utility")
        {
            val = generate_utility(s);
        }
        else if(graph_class == "cageish")
        {
            val = generate_cageish(s);
        }
        else if(graph_class == "robertson")
        {
            val = generate_robertson();
        }
        else if(graph_class == "peterson")
        {
            val = generate_peterson();
        }
        else if(graph_class == "pappus")
        {
            val = generate_pappus();
        }
        else if(graph_class == "mobius_kantor")
        {
            val = generate_mobius_kantor();
        }
        else if(graph_class == "mcgee")
        {
            val = generate_mcgee();
        }
        else if(graph_class == "hoffman")
        {
            val = generate_hoffman();
        }
        else if(graph_class == "heawood")
        {
            val = generate_heawood();
        }
        else if(graph_class == "grotzsch")
        {
            val = generate_grotzsch();
        }
        else if(graph_class == "franklin")
        {
            val = generate_franklin();
        }
        else if(graph_class == "folkman")
        {
            val = generate_folkman();
        }
        else if(graph_class == "flower_snark")
        {
            val = generate_flower_snark();
        }
        else if(graph_class == "dodecahedral")
        {
            val = generate_dodecahedral();
        }
        else if(graph_class == "desargues")
        {
            val = generate_desargues();
        }
        else if(graph_class == "clebsch")
        {
            val = generate_clebsch();
        }
        else if(graph_class == "chvatal")
        {
            val = generate_chvatal();
        }
        else if(graph_class == "cage")
        {
            val = generate_cage();
        }
        else if(graph_class == "brinkmann")
        {
            val = generate_brinkmann();
        }
        else if(graph_class == "blanusa_snark")
        {
            val = generate_blanusa_snark();
        }
        //document.getElementById("input_text").value = val;
        return parse_input_string(val, generate_random);
    }*/
 
}
//Output Format: IterationNo.\tNum_crossings\tMin_angle\tAvg_angle\tStress
//var canvas = document.getElementById("myCanvas");
function draw_graph(x,y,s,tx,ty)
{
    var min_angle = 400;    // Some large no.
    var avg_angle = 0;
    var num_crossings = 0;
    var min_angle_edge_indices = [];
    var curr_angle;
    /*if(canvas == null || canvas == undefined){
        canvas = document.getElementById("myCanvas");
    }*/
    // var canvas = document.getElementById("myCanvas");
    
    /*var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";*/
    for(var j=0;j<N;j++)
    {
        ctx.beginPath();
        ctx.arc(x[j]*s+tx,y[j]*s+ty,5,0,2*Math.PI);
        ctx.fillText(j+"",x[j]*s+tx+10,y[j]*s+ty+20);
        ctx.stroke();
    }
    for(var j=0;j<u.length;j++)
    {
        ctx.beginPath();
        ctx.moveTo(x[u[j]]*s+tx,y[u[j]]*s+ty);
        ctx.lineTo(x[v[j]]*s+tx,y[v[j]]*s+ty);
        ctx.stroke();
    }

    for(var i=0;i<u.length-1;i++)
    {
        for(var j=i+1;j<u.length;j++)
        {
            if(doIntersect(x[u[i]]*s+tx,y[u[i]]*s+ty,x[v[i]]*s+tx,y[v[i]]*s+ty,x[u[j]]*s+tx,y[u[j]]*s+ty,x[v[j]]*s+tx,y[v[j]]*s+ty))
            {
                //alert("("+u[i]+","+v[i]+"),("+u[j]+","+v[j]+")");
                //alert("i="+i+",j="+j);
                //alert((x[u[i]]*s+tx)+","+(y[u[i]]*s+ty)+","+(x[v[i]]*s+tx)+","+(y[v[i]]*s+ty)+","+(x[u[j]]*s+tx)+","+(y[u[j]]*s+ty)+","+(x[v[j]]*s+tx)+","+(y[v[j]]*s+ty));
                arr = getIntersection(x[u[i]]*s+tx,y[u[i]]*s+ty,x[v[i]]*s+tx,y[v[i]]*s+ty,x[u[j]]*s+tx,y[u[j]]*s+ty,x[v[j]]*s+tx,y[v[j]]*s+ty);
                //alert(arr[0]+","+arr[1]);
                /*ctx.beginPath();
                ctx.arc(arr[0],arr[1],5,0,2*Math.PI);
                ctx.stroke();
                ctx.fillText(get_angle(x[u[i]]*s+tx-arr[0],y[u[i]]*s+ty-arr[1],x[u[j]]*s+tx-arr[0],y[u[j]]*s+ty-arr[1])+"",arr[0]+10,arr[1]+10);*/
                //alert("("+(x[u[i]]*s+tx-arr[0])+","+(y[u[i]]*s+ty-arr[1])+"),("+(x[u[j]]*s+tx-arr[0])+","+(y[u[j]]*s+ty-arr[1])+")");

                num_crossings++;
                curr_angle = get_angle(x[u[i]]*s+tx-arr[0],y[u[i]]*s+ty-arr[1],x[u[j]]*s+tx-arr[0],y[u[j]]*s+ty-arr[1]);
                avg_angle += curr_angle;
                if(curr_angle < min_angle){
                    min_angle = curr_angle;
                    min_angle_edge_indices[0] = i;
                    min_angle_edge_indices[1] = j;
                }
            }
        }
    }

    avg_angle = avg_angle/num_crossings;
    var i = min_angle_edge_indices[0], j = min_angle_edge_indices[1];
    arr = getIntersection(x[u[i]]*s+tx,y[u[i]]*s+ty,x[v[i]]*s+tx,y[v[i]]*s+ty,x[u[j]]*s+tx,y[u[j]]*s+ty,x[v[j]]*s+tx,y[v[j]]*s+ty);
    ctx.beginPath();
    ctx.arc(arr[0],arr[1],5,0,2*Math.PI);
    ctx.stroke();
    ctx.fillText(get_angle(x[u[i]]*s+tx-arr[0],y[u[i]]*s+ty-arr[1],x[u[j]]*s+tx-arr[0],y[u[j]]*s+ty-arr[1])+"",arr[0]+10,arr[1]+10);
    console.log(fi + "\t" + num_crossings + "\t" + to_deg(min_angle) + "\t" + to_deg(avg_angle) + "\t" + get_stress(x,y));
    document.getElementById("num_crossings").innerHTML = "Number of crossings:" + num_crossings;
    if(min_angle==400)
        document.getElementById("min_angle").innerHTML = "Minimum angle:" + get_two_decimal(0);
    else
        document.getElementById("min_angle").innerHTML = "Minimum angle:" + get_two_decimal(to_deg(min_angle));
    document.getElementById("avg_angle").innerHTML = "Average angle:" + get_two_decimal(to_deg(avg_angle));
    document.getElementById("stress").innerHTML = "Stress:" + get_two_decimal(get_stress(x,y));
    return min_angle;
}
// x1,y1 is the 1st pt, x2,y2 is the 2nd pt, x3,y3 is the intersection pt.
function getAngleLineSeg(x1,y1,x2,y2,x3,y3){
    // Uses dot product
    var dc1x = x1-x3;
    var dc2x = x2-x3;
    var dc1y = y1-y3;
    var dc2y = y2-y3;
    var norm1 = Math.sqrt(Math.pow(dc1x,2) + Math.pow(dc1y,2));
    var norm2 = Math.sqrt(Math.pow(dc2x,2) + Math.pow(dc2y,2));
    var angle = Math.acos((dc1x*dc2x + dc1y*dc2y)/(norm1*norm2));
    return to_deg(angle);
}
function to_deg(rad){
    return rad*180/Math.PI;
}
function get_input_parameters(scale_input, translate_x_input, translate_y_input)
{
    /*var par = document.getElementById("parameters");
    if(par.value == "Default"){*/
        /*if(canvas == null || canvas == undefined){
            canvas = document.getElementById("myCanvas");
        }*/
        var center_gravity_x = 0;
        var center_gravity_y = 0;
        for(var j=0;j<N;j++)
        {
            center_gravity_x = center_gravity_x + x[j];
            center_gravity_y = center_gravity_y + y[j];
        }
        center_gravity_x = center_gravity_x/N;
        center_gravity_y = center_gravity_y/N;
        scale_input = 1;
        /*translate_x_input = canvas.width/2.0-center_gravity_x;
        translate_y_input = canvas.height/2.0-center_gravity_y;*/
        translate_x_input = window_width/2.0-center_gravity_x;
        translate_y_input = window_height/2.0-center_gravity_y;
    /*}
    else{
        scale_input = parseInt(document.getElementById("scale_input").value);
        translate_x_input = parseInt(document.getElementById("translate_x_input").value);
        translate_y_input = parseInt(document.getElementById("translate_y_input").value);
    }*/
}
function draw_default_embedding()
{
    read_input(false, "None", window_width, window_height);
    get_input_parameters(scale_input, translate_x_input, translate_y_input);
    draw_graph(x,y,scale_input,translate_x_input,translate_y_input);

    x = [];
    y = [];
    N = 0;
    u = [];
    v = [];
}

var abs = Math.abs;

function array_fill(i, n, v) {
    var a = [];
    for (; i < n; i++) {
        a.push(v);
    }
    return a;
}

/**
 * Gaussian elimination
 * @param  array A matrix
 * @param  array x vector
 * @return array x solution vector
 */
function gauss(A, x) {

    var i, k, j;

    // Just make a single matrix
    for (i=0; i < A.length; i++) { 
        A[i].push(x[i]);
    }
    var n = A.length;

    for (i=0; i < n; i++) { 
        //alert(A);
        // Search for maximum in this column
        var maxEl = abs(A[i][i]),
            maxRow = i;
        for (k=i+1; k < n; k++) { 
            if (abs(A[k][i]) > maxEl) {
                maxEl = abs(A[k][i]);
                maxRow = k;
            }
        }


        // Swap maximum row with current row (column by column)
        for (k=i; k < n+1; k++) { 
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }

        // Make all rows below this one 0 in current column
        for (k=i+1; k < n; k++) { 
            var c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    x = array_fill(0, n, 0);
    for (i=n-1; i > -1; i--) { 
        x[i] = A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] -= A[k][i] * x[i];
        }
    }

    return x;
}


var tutte_coords_x = [];
var tutte_coords_y = [];
function choose_some_vertices()
{
    tutte_coords_x[0]=0;
    tutte_coords_y[0]=0;
    tutte_coords_x[1]=0;
    tutte_coords_y[1]=3*N;
    tutte_coords_x[2]=3*N;
    tutte_coords_y[2]=0;
    tutte_coords_x[3]=3*N;
    tutte_coords_y[3]=3*N;
    return 4;
}
var adj_list = [];
function generate_adj_list()
{
    for(var i=0;i<N;i++)
    {
        adj_list.push([]);
    }
    for(var i=0;i<u.length;i++)
    {
        adj_list[u[i]].push([v[i]]);
        adj_list[v[i]].push([u[i]]);
    }
}
var adj_mat = [];
function generate_adj_mat(n,u,v)
{
    for(var i=0; i<n;i++)
    {
        adj_mat[i]=[];
        for(var j=0;j<n;j++)
        {
            adj_mat[i][j]=0;
        }
    }

    for(var i=0;i<u.length;i++)
    {
        adj_mat[u[i]][v[i]]=1;
        adj_mat[v[i]][u[i]]=1;
    }
}
function floyd_warshall(adj_mat)
{
    generate_adj_mat(x.length,u,v);
    var n=adj_mat.length;
    var D = [];
    for(var i=0; i<n+1;i++)
    {
        D[i]=[];
        for(var j=0;j<n;j++)
        {
            D[i][j]=[];
            for(var k=0;k<n;k++)
            {
                D[i][j][k]=0;
            }
        }
    }

    for(var j=0;j<n;j++)
    {
        for(var k=0;k<n;k++)
        {
            D[0][j][k]=adj_mat[j][k];
            if(adj_mat[j][k]==0)
                D[0][j][k]=10000;
            if(j==k)
                D[0][j][k]=100;
        }
    }
    //alert(D[0]);

    for(var k=1;k<n+1;k++)
    {
        for(var i=0;i<n;i++)
        {
            for(var j=0;j<n;j++)
            {
                if(i==j)
                {
                    if(!((D[k-1][i][k-1]==D[0][i][k-1])&&(D[k-1][k-1][j]==D[0][k-1][j])))
                    {
                        D[k][i][j] = Math.min(D[k-1][i][j], (D[k-1][i][k-1]+D[k-1][k-1][j]));
                    }
                    else
                        D[k][i][j]=D[k-1][i][j];
                }
                else
                    D[k][i][j] = Math.min(D[k-1][i][j], (D[k-1][i][k-1]+D[k-1][k-1][j]));
            }
        }
        //alert(D[k]);
    }

    alert(D[n][0][0]);
}
function run_tutte()
{
    read_input(false, "None", window_width, window_height);
    generate_adj_list();
    //floyd_warshall(adj_mat);
    var Nf = choose_some_vertices();
    // initialize the arrays
    var x_matrix = [];
    var y_matrix = [];
    var x_coeff = [];
    var y_coeff = [];
    for(var i=0;i<N-Nf;i++)
    {
        x_matrix.push([]);
        y_matrix.push([]);
        x_coeff.push([]);
        y_coeff.push([]);
        for(var j=0;j<N-Nf;j++)
        {
            x_matrix[i].push(0);
            y_matrix[i].push(0);
        }
    }
    // generate the array
    for(var i=0;i<N-Nf;i++)
    {
        // count number of neighbors
        var neighbors = adj_list[i+Nf].length;
        x_matrix[i][i] = -neighbors;
        y_matrix[i][i] = -neighbors;
        var count_constants_x = 0;
        var count_constants_y = 0;
        for(var j=0;j<neighbors;j++)
        {
            if(adj_list[i+Nf][j] < Nf)
            {
                count_constants_x += tutte_coords_x[adj_list[i+Nf][j]];
                count_constants_y += tutte_coords_y[adj_list[i+Nf][j]];
            }
            else
            {
                x_matrix[i][adj_list[i+Nf][j]-Nf]=1;
                y_matrix[i][adj_list[i+Nf][j]-Nf]=1;
            }
        }
        x_coeff[i] = -count_constants_x;
        y_coeff[i] = -count_constants_y;
    }

    //var gauss = require('./gaussian-elimination-master/gauss');
    //alert(gauss);

    $result1 = gauss(x_matrix, x_coeff);
    //alert($result1);
    $result2 = gauss(y_matrix, y_coeff);
    //alert($result2);
    //console.log($result);
    for(var i=0;i<N-Nf;i++)
    {
        tutte_coords_x[i+Nf] = $result1[i];
        tutte_coords_y[i+Nf] = $result2[i];
    }

    //draw_function
    get_input_parameters(scale_input, translate_x_input, translate_y_input);
    draw_graph(tutte_coords_x,tutte_coords_y,scale_input,translate_x_input,translate_y_input);

    x = [];
    y = [];
    N = 0;
    u = [];
    v = [];
    tutte_coords_x = [];
    tutte_coords_y = [];
    adj_list = [];
}
function repulsive_magnitude(distance, K)
{
    if(distance==0){
        distance = 0.0001;
    }
    return Math.pow(K,2)/distance;
}
// Attractive vs repulsive force scaling
var force_scaling = 1;
function attractive_mag(distance, K)
{
    return force_scaling * Math.pow(distance,2)/K;
}
var disp = [];
var xs = [];
var ys = [];
var improved_xs = [];
var improved_ys = [];
var improved_len = 0;
var dxs = [];
var dys = [];
var rows;
var fi = 0;
var scale_input = 1;
var translate_x_input = 10;
var translate_y_input = 10;

// Determine if All Pair Shortest Path is computed
var isAPSPComputed = false;
// stores shortest distance between all pairs of vertices
var distanceMatrix = [];
//Returns the stress in the current embedding of the graph
function get_stress(x,y){
    if(!isAPSPComputed){
        // computeAPSP
        for(var i =0; i<N; i++){
            // Perform bfs from every node as source node
            bfs(adj_list, i);
        }
        isAPSPComputed = true;
    }
    var stress = 0;
    var tempIdeal;
    var tempDist;
    var count = 0;
    // Get the stress
    for(var i=0; i<N-1; i++){
        for(var j=i+1; j<N; j++){
            count++;
            tempIdeal = distanceMatrix[i][j]*K;
            tempDist = Math.sqrt(Math.pow(x[i]-x[j],2) + Math.pow(y[i]-y[j],2));
            stress += Math.pow(tempIdeal-tempDist,2);
            // console.log(i + "," + j + ": " + tempDist + " -> " + tempIdeal);
        }
    }
    stress *= 0.5;
    var avgEdgeLength = 0;
    for(var i=0; i<u.length; i++){
        avgEdgeLength += Math.sqrt(Math.pow(x[u[i]]-x[v[i]],2) + Math.pow(y[u[i]]-y[v[i]],2)); 
    }
    avgEdgeLength/=u.length;
    console.log("Avg Edge Len: " + avgEdgeLength);
    return stress;
}
// Code adapted from http://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/
// Performs BFS traversal and fills the distance matrix with distances from source to all other vertices
function bfs(adj_list, s){
    //alert(s);
    if(adj_list.length<=0){
        generate_adj_list();
    }
    var visited = [];
    distanceMatrix[s] = [];
    var parent = [];
    
    // Mark all the vertices as not visited
    for(var i = 0; i < N; i++){
        visited[i] = false;
        distanceMatrix[s][i] = Infinity;
    }
    
    // distance to itself is 0
    distanceMatrix[s][s] = 0;
    // Create a queue for BFS
    var queue = [];
    // Mark the current node as visited and enqueue it
    visited[s] = true;
    queue.push(s);
    parent[s]=-1;
    while(queue.length > 0)
    {
        // Dequeue a vertex from queue
        var front = queue.shift();
        
        // Get all adjacent vertices of the dequeued vertex
        // If an adjacent vertex has not been visited, then mark it visited
        // and enqueue it
        for(var i = 0; i < adj_list[front].length; ++i)
        {
            if(!visited[adj_list[front][i]])
            {
                visited[adj_list[front][i]] = true;
                distanceMatrix[s][adj_list[front][i]] = distanceMatrix[s][front] + 1;
                queue.push(adj_list[front][i]);
                parent[adj_list[front][i]] = front;
            }
            /*else if(adj_list[front][i]!=s)
            {
                var node1 = adj_list[front][i];
                var node2 = front;
                var ignore = false;
                while(parent[node1]!=s)
                {
                    alert("node1:"+node1+",node2:"+node2+",parent[node2]:"+parent[node2]);
                    if((node1==node2)||(node1==parent[node2]))
                    {
                        ignore = true;
                        break;
                    }
                    node2=parent[node2];
                    node1=parent[node1];
                }
            }
            else
            {
                //goal find the first cycle
                //case1:adj_list[front][i] is front's parent
                //case2:
            }*/
        }
    }
}
var is_paused;
var is_next;
function get_two_decimal(x)
{
    return Math.round(x*100)/100;
}
function draw_force_directed()
{
    if(fi==0)
    {
        get_input_parameters(scale_input, translate_x_input, translate_y_input);
    }
    if(!is_paused)
    {
        draw_graph(xs[fi],ys[fi],scale_input,translate_x_input,translate_y_input);
        for(var i=0;i<rows.length;i++)
        {
            rows[i].cells[1].innerHTML=get_two_decimal(dxs[fi][i]);
            rows[i].cells[2].innerHTML=get_two_decimal(dys[fi][i]);
        }
    }
    else if(is_next){
        draw_graph(xs[fi],ys[fi],scale_input,translate_x_input,translate_y_input);
        for(var i=0;i<rows.length;i++)
        {
            rows[i].cells[1].innerHTML=dxs[fi][i];
            rows[i].cells[2].innerHTML=dys[fi][i];
        }
        is_next = false;
    }
    /*if(canvas == null || canvas == undefined){
        canvas = document.getElementById("myCanvas");
    }*/
    //draw_graph(xs[fi],ys[fi],1,canvas.width/2.0,canvas.height/2.0);
    fi++;
    if(fi==iterations)
        clearInterval(animeId);
}
var iterations;
var animeId;
// Extra repulsive force scaling for nodes with min. crossing angle
var repulsive_crossing_scaling = 40;
//var is_repulsion_crossing_enabled = false;
function toggle_repulsion_crossing()
{
    is_repulsion_crossing_enabled = !is_repulsion_crossing_enabled;
}
var K;
var show_drawing_animation = true;
function force_directed(window_width, window_height, iterations, parameters, K_in, temperature_in, cooling_id, x, y, N, u, v, output_file_prefix, is_repulsion_crossing_enabled)
{
    var min_angle = 400;    // Some large no.
    var max_min_angle = -1;
    var avg_angle = 0;
    var num_crossings = 0;
    var min_angle_edge_indices = [];
    var nodePairsToRepel = [];
    // nodePairsToRepel = [[v1,v2], [v3,v4]]
    // v1 repels v2, and v3 repels v4
    var curr_angle;
    var curr_iter=0;
    var init_temp;

    /*x = [];
    y = [];
    N = 0;
    u = [];
    v = [];*/
    is_paused = false;
    is_next = false;

    //read_input(generate_random, "None", window_width, window_height);


    var density = 2*u.length/x.length;
    //alert("density:"+density);
    //force_scaling = density; // force scale proportional to attractive force proportional to density
    if(N>=100)
    {
        if(graph_class == "Path")
        {
            force_scaling = density/100;
        }
        if(graph_class == "Cycle")
        {
            force_scaling = density/100;
        }
        if(graph_class == "Grid")
        {
            force_scaling = density/10;
        }
        if(graph_class == "Complete")
        {
            force_scaling = density/1000;
        }
    }
    //alert("force_scaling:"+force_scaling);

    /*if(canvas == null || canvas == undefined){
        canvas = document.getElementById("myCanvas");
    }
    var temperature = canvas.width/10;*/
    var temperature = window_width/10;
    init_temp = temperature;
    //iterations = parseInt(document.getElementById("iterations_input").value);
    //if(document.getElementById("parameters").value == "Default")
    if(parameters == "Default")
    {
        //K = Math.sqrt(canvas.width * canvas.height / N);
        K = Math.sqrt(window_width * window_height / N);
        K = K/5;
        if(graph_class == "Path" || graph_class == "Cycle")
        {
            //K = canvas.width/(5*N);
            K = window_width/(5*N);
        }
    }
    else{
        /*K = parseInt(document.getElementById("k_input").value);
        temperature = parseInt(document.getElementById("temparature_input").value);*/
        K = K_in;
        temperature = temperature_in;
    }
    var dt = temperature/(iterations+1);
    var dx, dy, ddx, ddy, delta, rForce, aForce;

    //var table = document.getElementById("force_directed_statistics");
    console.log("force_directed_statistics");

    /*var starting_length = table.rows.length;
    for(var i=0;i<starting_length;i++)
    {
        table.deleteRow(0);
    }*/

    //var row = table.insertRow(table.rows.length);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    /*var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);*/

    // Add some text to the new cells:
    /*cell1.innerHTML = "Node";
    cell2.innerHTML = "dx";
    cell3.innerHTML = "dy";
    rows = [];*/

    for(var i = 0; i < N; i++) //repulsive forces
    {
        disp.push([]);
        disp[i].push(0);
        disp[i].push(0);

        /*var row = table.insertRow(table.rows.length);

        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Add some text to the new cells:
        cell1.innerHTML = i;
        cell2.innerHTML = 0;
        cell3.innerHTML = 0;

        rows.push(row);*/
    }

    xs = [];
    ys = [];
    dxs = [];
    dys = [];
    fi = 0;
    improved_xs = [];
    improved_ys = [];
    improved_len = 0;

    //is_repulsion_crossing_enabled = true;
    //console.log("is_repulsion_crossing_enabled: "+is_repulsion_crossing_enabled);

    for(var p = 0; p < iterations; p++)
    {
        //console.log("x:"+x);
        //console.log("y:"+y);
    	for(var i = 0; i < N; i++) //repulsive forces
    	{
            disp[i][0]=0;
            disp[i][1]=0;
            for(var k =0; k < N; k++)
            {
                if(i!=k)
                {
                    dx = x[i] - x[k];
                    dy = y[i] - y[k];

                    if(dx==0 && dy==0){
                        dx=Math.random();
                        dy = Math.random();
                    }

                    delta = Math.sqrt(dx*dx+dy*dy);
                    //TODO: Why this condition; Nodes may overlap due to this; Apply force on any arbitrary direction
                    if (delta != 0)
                    {
                        rForce = repulsive_magnitude(delta, K)/delta;
                        if(is_repulsion_crossing_enabled){
                            if(nodePairsToRepel.length>0){
                                if( (i==nodePairsToRepel[0][0] && k == nodePairsToRepel[0][1]) ||
                                    (i==nodePairsToRepel[0][1] && k == nodePairsToRepel[0][0]) ||
                                    (i==nodePairsToRepel[1][0] && k == nodePairsToRepel[1][1]) ||
                                    (i==nodePairsToRepel[1][1] && k == nodePairsToRepel[1][0])
                                ){
                                    rForce *= repulsive_crossing_scaling;
                                    // console.log("Rep. force applied betn: " + i + ", " + k);
                                }
                            }
                        }
                        disp[i][0] = disp[i][0] + dx*rForce;
                        disp[i][1] = disp[i][1] + dy*rForce;
                    }
                }
            }
    	}
        for(var i = 0; i < u.length; i++) //attractive forces
        {
            dx = x[u[i]] - x[v[i]];
            dy = y[u[i]] - y[v[i]];
            delta = Math.sqrt(dx*dx + dy*dy);
            if(delta !=0)
            {
                aForce = attractive_mag(delta, K)/delta; //more attractive forces 
                ddx = dx * aForce;
                ddy = dy * aForce;
                disp[u[i]][0] = disp[u[i]][0] - ddx;
                disp[u[i]][1] = disp[u[i]][1] - ddy;
                disp[v[i]][0] = disp[v[i]][0] + ddx;
                disp[v[i]][1] = disp[v[i]][1] + ddy;
            }
        }
        // limit displacement to temperature and frame


        dxs.push([]);
        dys.push([]);

        for(var i = 0; i < N; i++)
        {
            dx = disp[i][0];
            dy = disp[i][1];
            dxs[p].push(dx);
            dys[p].push(dy);
            var disp_val = Math.sqrt(dx*dx+dy*dy);
            if(disp_val!=0)
            {
                var d = Math.min(disp_val, temperature);
                var x_val = x[i] + dx/disp_val*d;
                var y_val = y[i] + dy/disp_val*d;
                //x_val = Math.min(canvas.width/2, Math.max(-canvas.width/2, x_val));
                //y_val = Math.min(canvas.height/2, Math.max(-canvas.height/2, y_val));
                //var newX = (Math.min(Math.sqrt(canvas.width*canvas.width/4-y_val*y_val), Math.max(-Math.sqrt(canvas.width*canvas.width/4-y_val*y_val), x_val)) + canvas.width/2);
                //var newY = (Math.min(Math.sqrt(Math.height*Math.height/4-x_val*x_val), Math.max(-Math.sqrt(canvas.height*canvas.height/4-x_val*x_val),y_val)) + canvas.height/2);
                x[i] = x_val;
                y[i] = y_val;
                //x[i] = newX;
                //y[i] = newY;
            }
        }


        curr_iter++;
        // temperature -= dt;   //Linear cooling
        //if(document.getElementById("cooling_id").value == "Linear")
        if(cooling_id == "Linear")
        {
            temperature = cool_linear(temperature, init_temp, iterations);
        }

        //Geometric cooling function Tn+1 = 0.75Tn
        //if(document.getElementById("cooling_id").value == "Geometric")
        if(cooling_id == "Geometric")
        {
            temperature = cool_geom(temperature);
        }
        //Quenching + Simmering - Rapidly and steadily decreasing followed by slow cooling
        //if(document.getElementById("cooling_id").value == "Quench_simmer")
        if(cooling_id == "Quench_simmer")
        {
            temperature = cool_quench_simmer(temperature, init_temp, curr_iter, iterations);
        }
        
        //Smooth quenching
        //if(document.getElementById("cooling_id").value == "Quench_smooth")
        if(cooling_id == "Quench_smooth")
        {
            temperature = cool_quench_smooth(temperature, init_temp, curr_iter, iterations);
        }              
        //exponential cooling
        //if(document.getElementById("cooling_id").value == "Exponential")
        if(cooling_id == "Exponential")
        {
            temperature = cool_exp(temperature, init_temp, curr_iter, iterations);
        }
        //bouncy cooling
        //if(document.getElementById("cooling_id").value == "Bounce")
        if(cooling_id == "Bounce")
        {
            temperature = cool_bounce(temperature, init_temp, curr_iter, iterations); 
        }
        
        // elastic cooling
        //if(document.getElementById("cooling_id").value == "Elastic")
        if(cooling_id == "Elastic")
        {
            temperature = cool_elastic(temperature, init_temp, curr_iter, iterations);
        }

        //alert(p);

        xs.push([]);
        ys.push([]);
        for(var i=0;i<N;i++)
        {
            xs[p].push(x[i]);
            ys[p].push(y[i]);
        }

        min_angle = 400;    // Some large no.
        avg_angle = 0;
        num_crossings = 0;
        min_angle_edge_indices = [];
        for(var i=0;i<u.length-1;i++)
        {
            for(var j=i+1;j<u.length;j++)
            {
                if(doIntersect(x[u[i]]*scale_input+translate_x_input,y[u[i]]*scale_input+translate_y_input,x[v[i]]*scale_input+translate_x_input,y[v[i]]*scale_input+translate_y_input,x[u[j]]*scale_input+translate_x_input,y[u[j]]*scale_input+translate_y_input,x[v[j]]*scale_input+translate_x_input,y[v[j]]*scale_input+translate_y_input))
                {
                    
                    arr = getIntersection(x[u[i]]*scale_input+translate_x_input,y[u[i]]*scale_input+translate_y_input,x[v[i]]*scale_input+translate_x_input,y[v[i]]*scale_input+translate_y_input,x[u[j]]*scale_input+translate_x_input,y[u[j]]*scale_input+translate_y_input,x[v[j]]*scale_input+translate_x_input,y[v[j]]*scale_input+translate_y_input);
                    
                    num_crossings++;
                    curr_angle = get_angle(x[u[i]]*scale_input+translate_x_input-arr[0],y[u[i]]*scale_input+translate_y_input-arr[1],x[u[j]]*scale_input+translate_x_input-arr[0],y[u[j]]*scale_input+translate_y_input-arr[1]);
                    avg_angle += curr_angle;
                    if(curr_angle < min_angle){
                        min_angle = curr_angle;
                        min_angle_edge_indices[0] = i;
                        min_angle_edge_indices[1] = j;
                    }
                }
            }
        }
        avg_angle = avg_angle/num_crossings;
        var i = min_angle_edge_indices[0], j = min_angle_edge_indices[1];
        arr = getIntersection(x[u[i]]*scale_input+translate_x_input,y[u[i]]*scale_input+translate_y_input,x[v[i]]*scale_input+translate_x_input,y[v[i]]*scale_input+translate_y_input,x[u[j]]*scale_input+translate_x_input,y[u[j]]*scale_input+translate_y_input,x[v[j]]*scale_input+translate_x_input,y[v[j]]*scale_input+translate_y_input);
        
        //console.log("Minimum angle: "+ to_deg(min_angle));
        if(max_min_angle < min_angle)
        {
            max_min_angle = min_angle;
            improved_xs.push([]);
            improved_ys.push([]);
            for(var b=0;b<N;b++)
            {
                improved_xs[improved_len].push(x[b]);
                improved_ys[improved_len].push(y[b]);
            }
            improved_len = improved_len + 1;
        }

        nodePairsToRepel = [];
        if(num_crossings>0){
            //Try the repelling pair as (u[i], u[j]) and (v[i], v[j])
            if(getAngleLineSeg(x[u[i]]*scale_input+translate_x_input, y[u[i]]*scale_input+translate_y_input, x[u[j]]*scale_input+translate_x_input, y[u[j]]*scale_input+translate_y_input, arr[0], arr[1]) < 90){
                // keep those as repelling pair
                nodePairsToRepel = [ [u[i],u[j]], [v[i],v[j]] ];
                // console.log(nodePairsToRepel);
                // console.log("Set: (" + u[i] + ", " + u[j] + "), (" + v[i] + ", " + v[j] + ")");
                // u[i] repels u[j], and v[i] repels v[j]
            }   else {
                // The repelling pair are (u[i], v[j]) and (v[i], u[j])
                nodePairsToRepel = [ [u[i],v[j]], [v[i],u[j]] ];
                // console.log("Set: (" + u[i] + ", " + v[j] + "), (" + v[i] + ", " + u[j] + ")");
            }
        }
    }
    /*if(show_drawing_animation)
        animeId = setInterval(draw_force_directed,parseInt(document.getElementById("interval_period").value));
    //clearInterval(animeId);*/

    console.log("Minimum angle: "+ to_deg(max_min_angle));

    var fs = require('fs');
    fs.writeFile(output_file_prefix, output_format(improved_xs[improved_len-1], improved_ys[improved_len-1], u, v), function(err) {
        if(err) {
        return console.log(err);
        }

        console.log("The file " + output_file_prefix + " was saved!");
    });
}
function output_format(x, y, u, v)
{
    var str = x.length+"\n";
    for(var i=0;i<x.length;i++)
    {
        x[i] = Math.floor(x[i]);
        y[i] = Math.floor(y[i]);
    }
    var min_x = x[0];
    var min_y = y[0];
    for(var i=0;i<x.length;i++)
    {
        if(min_x>x[i])min_x = x[i];
        if(min_y>y[i])min_y = y[i];
    }
    for(var i=0;i<x.length;i++)
    {
        str = str + (x[i]-min_x) + " " + Math.floor(y[i]-min_y) + "\n";
    }
    for(var i=0;i<u.length;i++)
    {
        str = str + u[i] + " " + v[i] + "\n";
    }
    return str;
}
function check_planarity()
{
    x = [];
    y = [];
    N = 0;
    u = [];
    v = [];


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Planar:"+this.responseText);
            if(this.responseText=="True")is_planar=true;
            else is_planar=false;
        }
    };
    read_input(false, "None", window_width, window_height);
    var edge_list = "";
    for(var i=0;i<u.length;i++)
    {
        edge_list = edge_list + "(" + u[i] + "," + v[i] + "),";
    }
    //xhttp.open("GET", "http://localhost/gd2017/check_planarity.php?edge_list="+edge_list, true);
    xhttp.open("GET", "http://cgi.cs.arizona.edu/~abureyanahmed/gd2017/check_planarity.php?edge_list="+edge_list, true);
    xhttp.send();
}
function get_transformation_parameters()
{
    var params = [];
    params.push(0);
    params.push(0);
    params.push(0);
    //var canvas = document.getElementById("myCanvas");
    var max_x = 0;
    var max_y = 0;
    var min_x = x[0];
    var min_y = y[0];
    for(var j=0;j<N;j++)
    {
        if(max_x<x[j])max_x = x[j];
        if(max_y<y[j])max_y = y[j];
        if(min_x>x[j])min_x = x[j];
        if(min_y>y[j])min_y = y[j];
    }
    //params[0] = (canvas.width-100)/(max_x-min_x);
    params[0] = (window_width-100)/(max_x-min_x);
    params[1]=min_x;
    params[2]=min_y;
    return params;
}
function planar_drawing()
{
    x = [];
    y = [];
    N = 0;
    u = [];
    v = [];


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var lines = this.responseText.split('\n');
            for(var j=0;j<N;j++)
            {
                arr = lines[j].split(' ');
                x[j]=parseInt(arr[0]);
                y[j]=parseInt(arr[1]);
            }
            var params = get_transformation_parameters();
            draw_graph(x,y,params[0],params[1]+50,params[2]+50);
            var str = "";
            for(var i=0;i<x.length-1;i++)
            {
                str = str + x[i] + " " + y[i] + '\n';
            }
            str = str + x[x.length-1] + " " + y[x.length-1];
            document.getElementById("output_text").value = str;
            /*document.getElementById("rightside").style="display:none";
            document.getElementById("graph_draw_image").style="";
            document.getElementById("graph_draw_image").innerHTML="<img src='graph.png'>";*/
        }
    };
    read_input(false, "None", window_width, window_height);
    var edge_list = "";
    /*for(var i=0;i<u.length;i++)
    {
        edge_list = edge_list + "(" + u[i] + "," + v[i] + "),";
    }*/
    edge_list = edge_list + N + "\n";
    edge_list = edge_list + u.length + "\n";
    for(var i=0;i<u.length;i++)
    {
        edge_list = edge_list + u[i] + " " + v[i] + "\n";
    }
    //xhttp.open("GET", "http://localhost/gd2017/planar_drawing.php?edge_list="+edge_list, true);
    xhttp.open("GET", encodeURI("http://cgi.cs.arizona.edu/~abureyanahmed/gd2017/planar_drawing.php?edge_list="+edge_list), true);
    xhttp.send();
}
function remove_overlap()
{
    var max_width = 1000000 - 10;
    var max_height = 1000000 - 10;
    var max_x = 0;
    var max_y = 0;
    var min_x = x[0];
    var min_y = y[0];
    for(var j=0;j<N;j++)
    {
        if(max_x<x[j])max_x = x[j];
        if(max_y<y[j])max_y = y[j];
        if(min_x>x[j])min_x = x[j];
        if(min_y>y[j])min_y = y[j];
    }
    for(var j=0;j<N;j++)
    {
        x[j]=x[j]-min_x;
        y[j]=y[j]-min_y;
    }
    var scale_x = max_width/(max_x-min_x);
    var scale_y = max_height/(max_y-min_y);
    for(var j=0;j<N;j++)
    {
        x[j]=x[j]*scale_x;
        y[j]=y[j]*scale_y;
    }
}
function soft_repulsion_toggle()
{
    document.getElementById("is_repulsion_crossing_enabled").checked = !document.getElementById("is_repulsion_crossing_enabled").checked;
}
/*function test()
{
    show_drawing_animation = false;
    var final_xs = [];
    var final_ys = [];
    var max_min_angle = 0;
    var max_ind =-1;
    var number_of_try = 10;
    var toggled_once = false;
    for(var p=0;p<number_of_try;p++)
    {
        if(!toggled_once)
        {
            if(p>(number_of_try/2))
            {
                soft_repulsion_toggle();
                toggled_once = true;
            }
        }
        if((p==0)||(p==(number_of_try-1)))force_directed(false, window_width, window_height, iterations, parameters, K_in, temperature_in);
        else force_directed(true, window_width, window_height, iterations, parameters, K_in, temperature_in);
        final_xs.push([]);
        final_ys.push([]);
        remove_overlap();
        for(var i=0;i<N;i++)
        {
            final_xs[p].push(Math.floor(x[i]));
            final_ys[p].push(Math.floor(y[i]));
        }
        get_input_parameters(scale_input, translate_x_input, translate_y_input);
        var z = draw_graph(final_xs[p],final_ys[p],scale_input,translate_x_input,translate_y_input);
        if(z>max_min_angle)
        {
            max_min_angle = z;
            max_ind = p;
        }
    }
    soft_repulsion_toggle();
    var params = get_transformation_parameters();
    draw_graph(final_xs[max_ind],final_ys[max_ind],params[0],params[1]+50,params[2]+50);
    var str = "";
    for(var i=0;i<final_xs[max_ind].length-1;i++)
    {
        str = str + final_xs[max_ind][i] + " " + final_ys[max_ind][i] + '\n';
    }
    str = str + final_xs[max_ind][final_xs[max_ind].length-1] + " " + final_ys[max_ind][final_xs[max_ind].length-1];
    document.getElementById("output_text").value = str;
    show_drawing_animation = true;
}*/
function final()
{
    x = [];
    y = [];
    N = 0;
    u = [];
    v = [];


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var rt = this.responseText;
            alert("Planar:"+rt);
            if(rt.substring(0,4)=="True")
            {
                planar_drawing();
            }
            else if(rt.substring(0,5)=="False")
            {
                test();
            }
        }
    };
    read_input(false, "None", window_width, window_height);
    var edge_list = "";
    for(var i=0;i<u.length;i++)
    {
        edge_list = edge_list + "(" + u[i] + "," + v[i] + "),";
    }
    //xhttp.open("GET", "http://localhost/gd2017/check_planarity.php?edge_list="+edge_list, true);
    xhttp.open("GET", "http://cgi.cs.arizona.edu/~abureyanahmed/gd2017/check_planarity.php?edge_list="+edge_list, true);
    xhttp.send();
}
/*function run_selected_algorithm()
{
    var x = document.getElementById("embedding_selector");
    if(x.value == "Default")draw_default_embedding();
    else if(x.value == "Tutte")run_tutte();
    else if(x.value == "Force")force_directed(false, window_width, window_height, iterations, parameters, K_in, temperature_in);
    else if(x.value == "check_planarity")check_planarity();
    else if(x.value == "planar_drawing")
    {
        planar_drawing();
        document.getElementById("input_text").style = "";
    }
    else if(x.value == "Final")final();
}*/


// Linear cooling
function cool_linear(temp, init_temp, iters){
    var dt = init_temp/(iters+1);
    return temp - dt;
}
// Geometric cooling
// Tn+1 = 0.75*Tn; Recommended constant in the range [0.6,0.95]
function cool_geom(temp, gamma=0.75){
    return gamma*temp;
}
// quenching plus simmering from FR Paper
// quenching is a rapid steady decrease; simmering is constant low temp
// simmerPt is the time when simmering starts (as a fraction of total iterations)
// simmerTemp is the temp. at the start of simmering (as a fraction of the starting temp.)
// 
function cool_quench_simmer(temp, init_temp, iter, iterations, simmerPt=0.3, simmerTemp=0.3){
    var time_frac = iter/iterations;
    if(time_frac<simmerPt){
        return init_temp*(1 - time_frac * (1-simmerTemp)/simmerPt);
    }   else {
        return simmerTemp*init_temp*(1 - (time_frac-simmerPt)/(1-simmerPt));
    }
}
function cool_quench_smooth(temp, init_temp, iter, iterations, param=4.0){
    var time_frac = iter/iterations;
    return init_temp*d3.easePolyln(1-time_frac,param);
}
function cool_exp(temp, init_temp, iter, iterations){
    return init_temp*d3.easeExpIn(1-iter/iterations);
}
function cool_bounce(temp, init_temp, iter, iterations){
    return init_temp*d3.easeBounceIn(1-iter/iterations);
}
function cool_elastic(temp, init_temp, iter, iterations){
    return init_temp*d3.easeElasticIn(1-iter/iterations, 1, 0.2);
}
function usage()
{
    if(process.argv.length<7)
    {
        console.log("Usage:node force_directed.js file_name output_file iterations repulsion_crossing/no_repulsion_crossing random/input");
        process.exit();
    }
}
usage();
//force_directed(false, 300, 300, 100, "Default", 1500, 30, "Linear");
console.log('process.argv[2]: '+process.argv[2]);
var generate_random = false;
if(process.argv[6]=="random")
    generate_random = true
grid_size_x = 1000000-10
grid_size_y = 1000000-10
// The last parameter is is_repulsion_crossing_enabled, it should be true for contest
if(process.argv[5]=="repulsion_crossing")
    read_input_and_draw(generate_random, "None", grid_size_x, grid_size_y, "force directed", parseInt(process.argv[4]), "Default", 1500, 30, "Linear", process.argv[2], process.argv[3], true);
else
    read_input_and_draw(generate_random, "None", 3000, 3000, "force directed", parseInt(process.argv[4]), "Default", 1500, 30, "Linear", process.argv[2], process.argv[3], false);

