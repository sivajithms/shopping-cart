var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"pixel 7",
      category:"Mobile",
      description:"This is excellent device",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"iphone 14 pro",
      category:"Mobile",
      description:"This is excellent device",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"samsung s22",
      category:"Mobile",
      description:"This is excellent device",
      image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUSFRUSEhIZGRgYHRwYGRgZGBgVGRwcHBYZGhgaHBgcIS4lHiErHxgYJzgnKy8xNTU2GiU7QDszPy40NjEBDAwMEA8QHxISHjQsJSsxPTU0NDc/NT80NjQ6NDY0NDQ0PTQ0NDQ1MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQQFBgcIAwL/xABJEAACAQIDAwUMBQoFBQEAAAABAgADEQQSIQUxQQYiUXGyBxMyNGFyc4GRobHwI4KT0dIUFSQzQlRVksHxFlJjZeEXRVOiwkP/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEAQX/xAApEQEAAgIABQQBBAMAAAAAAAAAAQIDEQQSITEyE0FRgTMUImFxI0LB/9oADAMBAAIRAxEAPwDc0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARE17y15bNh3OHw9gy6M1gTfiFuCABuJsdbjS14GwomgqnKzGMb/AJQ46qlQD2B7T5/xTjP3qr9pU/FA3/E5+XlTi7m+KradFZxw8pM+/wDFOJ/ea/27wN/RNA/4pxP7zX+3eQeVOK/ea/27wN/yJoA8qcVv/Kq/2zy8bDwu2ccgrUsS9Kk3gPVrVAXGvOVFvp5Ta/C8T0G54mrm5K7aAv8AnYfz1pbH2ftdTY7T8nh1ZVfLSnlOkq1tbtDckTTn5s2vv/OZ/nq/dKXHJtKgoettgIpOUFnqAE2Jtu6AT6pCOJxTOol307fDdsTTX5v2t/FD/PV+6Ds7a4/7of56v3Tn6rD8np2+G5YmmjgNr/xM/wA9WfL4Ta66jaVz0F6oHr0M7+pxfJ6dvhueJqnk7y4xWHrphNpgFX0SqLcTYNmAAZb2vcXF7noO1pfWYmNwjMa7piInXCIiAiIgIiICIiAnOPKHEE1q1RteczH1ksfeT7Z0dObttAGtVB3EkH2QLJjcQHvcLzRe2m64BsDvPHpsCdwn3smozB1O5bEcbXvp7p4/m181w66bsxIPuBlxw9FaaFQ2YsQztYgEgGyqDrYZm1IFydwtAqcBhWrVVpJbM7BRc2GvEnoldt7Yr4N1SoysHGZWW9jY2Isdxv8AGWqjUZWzKSGBBBBsQRuIMqMdj6lds9aozsBYE8B0ADQbzA8JEi8i86488YMylQbZrL7SNZ0tRoqiqiABVAVQNAABYAeoTmqqdPrJ2xOmjK7pQgiYvtrC5HzcD8j+nsmUSnxuGFRWQ8RoegzLnxepTXv7LaW5Z2xYbhrLftbZNHFKqYhCyq2YWLKQbEHVSDaxIIlwamyEo+8aerpnz/aeRHNWfiYap1KUQAAKAALADoHRu3T5YDjaCJ9hhvP3xWI31J7PK3H+vw+fhPki27/ierDiPnSfBXoPX0bt9pOYieiLD+6HSBo0XtqtUC532ZWuL9Bsp9Qm4dk1C9Ci7alqaMesoCZqPuh+LJ6VOrwXm2dh+LYf0VPsCetwW/S6s2XuuERE1qiIiAiIgIiICIiAnNe23tWqk7gxPunSk5o22A1aqDxJHtEC04zE5vBBAUcCQd4F2IPSR7Z9bOrs4YHXLbXyG/3Snp4SqGuqBrccyjeLbiR0yvw9AUlILAu5DPlsVUAHKoYaE3Yk200Gp1geiHUz6vPhDvk3nXE3kXi8i8BU8H6ydsTpozmRvB+snbE6bMrunCIiJW6t+09nCoMw0Ybj0+QzHACpII14zMjLVtjBZhnQc5dSBxH36TDxeDmjmr3XY76nUrL1xltr7p6BePwkqL/Np50Tpo083XQffPhmE9nXyzzfpt7ZZX90OT0Yd3Q/Fk9KnZebZ2H4th/RU+wJqXuh+LJ6VOw/sm2th+LYf0VPsCevwf4+nyyZfJcIiJrVEREBERAREQERED5JsLmcy7UqhqjuDzScwO7QqCD7J0zV8Fuo/CcuYhbi3SiD/wBFgU2LxI3ISLcdLny2toJOErlwb71tr13t8DKenTcN+qZxuIALKfIbDpsesCV1DDmkjd8FncqcnFFW553QxLDTeAuu8QPSmd8+7zypnf8APCfd51xN5F5BMi8Opbd9ZO2J06ZzDw+svbE6eMrulCIiJW6T5afUQ6sG0sNkbMo5re48RKJT8/2mS4imHBU7j7ugzGshUlSNRp7p5fE4YrbmjtLRjtuNPpt08z8/Psn1luDPMtb1SisalOZ2xHuiL+jJ6VOw/sm0+T1QNhcOym4NKnb+QTV3dF8WT0ydl5snkd4jhPQ0+wJ6/BzvH9suXyXuIia1RERAREQEREBERA+Kvgt1H4TlyuG5pynVFt4PBQvT0gzqNxcEdOk5o2hT72wp3vkBW/Tldxf3QLeGYblPtH3xZuAt12+AnreRedBFsLReReReB9XkXnzeReB6Dd9ZO3OnzOX13Hzk7c6gMrulCIiJW6REQPlh5Jj21B9JfpGvqNv6TIpjm1Bao2vyQDMXHW5cf2txeTwPyZ5H5/vJZ9J5sL8Z51LtEwxXuiN+jIP9ZPcrzZXI/wARwnoafYE1n3Q/Fk9MnZebS5NUcmEwyXvakmu79gT2eC/H9smXyXWIibFRERAREQEREBERA+WNgT0TmbaVUO+cbmBYX32Z3I+M6Yq+C3UfhOYMRuTzB8WgeV5F5F5F50TeReLyCYE3kEyLyLwPVNx85O1OoTOXaW4+cnbnURld0oRETzrMQNOr3StJ93i8tmPdlRmVmuLW9ZmP0tu1CodHV0O5lysp6mEoycRFJ1MSlWsyyfG41KYGdrX3Dieob5i71S5LHeTfq+d0pQzOxd2LMeJ4T1Z+E8nis85p1rUQ00pyvcPpIZxaUxqSe+SmekRpJjfdD8WT0qdl5tTk7VD4XDuNxpJ2BNT8vj+j0/Sp2Xm0uR/iOE9EnYE9zgN+j1+WTN5L1ERNykiIgIiICIiAiIgJzJts/St1t23nTc5i22fpn627bwKG8i8i8i86JvIvIvIvAm8i8i8i8Coo7j5ydudRmct0DofOTtzqQyu6VXzLKrEPvJLE7z16a/OkvcxXbeZHsGIG8W033195mHirzSsWj2lbjjmmYVe2cUMihN7EHoNhr8be+ax2tsLDYEmrQx7YJzqELNVVugd7F3I13nMJldKuS65mub8TeYryU2Zgaq9+oA4irvc17M6MeJp+Da+5ud18JTgy2vNskzOukahO9YjVVPsfljiBTNTE4J3pDQ4ijTKCwG8qQEO7hlAmWYbGLWRatNiUcZlJGU2uRqDu1B9kpcPt5Ktd8PSqF3poXZ1PMUhlUID+0edw0FuOtvUuNLAAcABYakk6Dykn1yniYrP+up/4njifncKwT7WnpvlNSeVdMzLHTut0xbl+tsMnpU7Lzbuw/FsP6Kn2BNT90TTDJ6ZOy82xsPxbD+ip9gT2uB/F9sefyXCIibVJERAREQEREBERATmDbh+mfrbtvOn5y/tw/TP1t22gUF5F5F5F4E3kXkXi8BeLyLyLwKnDbm85O3OpTOWcNubzk7c6kYyF0oQxmPcqQAitxvb3H7pfXqdPzpMd5TuDT1OoII9trfGZOIiJxzC3H5QxUXZwAdSd8wvG4N9pVWr4SkMOmVlaszGma7HQgqumuoNh05jfSZvhku6dYmKbNxW0cQG73Uwwp0272rlFWmxXhTAS5Uaa2A1mfgt1ra0a++yzN1mIVfJnFqiNgzhzh61Jc1QbxUFwvfMx1Juw0uRY8020F0Fe8tOycXiqlWvTxhpZqKZQqqqvZmVsyso5yEDXXeV0lciHdvPQJXxkRF9/MJ4fFc8O97S40mGn95aaVPJY1GVbkKMzKt2O5VudW8krQ1t/CZopOtzCzcLN3Qmvhk9MnZebZ2H4th/RU+wJp7l098Mg/wBVOy83DsPxbD+ip9gT1+C/F9sefyXCIibFJERAREQEREBERATl7bp+nfrbttOoZy5t4/Tv1t22gW+8i8SIE3kXkRAXkXiRAqsJubzk7c6hrFhuW/rAHvnLuE3N5ydudTuL3EryJVY++3UYMc1rXGvHyj2CY1jMV31r8BwHxM9Np7Fag3OdShPNNwD6weMoKn0ZzKfVvvPEy3y2/bZspWsdYeyOAw0NuMxHA4x9nI2ExOGquiszUa1JQwZW1sb2Hl33FyLS/YrCV66qtPENh3zXLhcxZSCMtrjifdLGmIZfB5SgdSOP/qbuEx1mkxM7j3hVlmYttVbIw1atWrY6vTaijoKNJHuGygqSxuAf2R1ljbQS7U6ipovHf0n7hKDYxNR3B2sMZzCcmRlK89Ofcnhu+tPTbyvhsLWxKjnoFCk2IBZlTNY9Ga/XK89JtlisfX8JUmIrtb+VGHxNU0Gp1/o+/wBLJTFEMaRCW76zWuyg5jY6c6ZJh6VXKq1anfXGbPUChA3OJXmjQWWw9UxbF4bF7OWniXxL4mg2Xv6m/NDgZWQsxuLnRubc2BFjLgazLj8AlKsTRq0neyscjjLVysVBsSLDfqLeSW5KWtSKxMaj3/r2RraInfu8uXSWw6H/AFU7Lzcew/FsP6Kn2BNRcvh+jJp/+ydl5t3Yfi2H9FT7AlnBfi+0M3kuERE2KSIiAiIgIiICIiAnLe3v17+c3badSTlrb36+p5zdtoFvkRED4e+lp8FX6fk2/wCZ6yIHmQ2sFW11+bj+l/bPSIFTgvBbzk7c6R25tFqYy07ZjxP7I6euc3YQ6N5ydub22lXLux8vz7vhMnF3mtYiO8rsVYmeqyYxSxzVWJJ4kkk+volI9cixFrjwfJ0Srxa5z1fIlsYEvY8LTy5j4at9F1wBZnUtrx6/JMf5BbIw2IoPiXw9J6j1HDKVUpTAsVRE3Lob336+SZRg6QRTUdgqoC5ZjlVQNSSTuA/pMS5R4bBUWpYujjcThxjAz5sOuZGClc5K50ZdW3a2ObQbps4Ws8s1jcb91GSesSuPJ3B0cNtPGYWgiZDRVybZmpNmTNTDb8pLA2J0sOiZNtU0loVvyq3ecrCpf/L5CNb3y2tre1tZaOS2Dw1GiWwDGt308+uxuzMNcrLa62zeCQDzrm++V3KLk/iMXg8RSQc9lUoui5mVlcLruvlsCTvIvO2tzZorG+neXIjVdsf5LbewNRE2eiVQGVlQYkKRVVmYlbqSL7wBoNLDWfOE2DgsFtHDpTFcVai1HRS1M0VGSorKbjNuVranhLpj9h1dpYGj3yj+TYlBele6sjIcttwZVfKDb9nmnW2tmwK4+ttHB1MZgalM0Uem9QI3e3Jp1SHzAZRcsBoSCd1r2l/L5THTvuP5R322qO6IlsMnpk7LzbGw/FsP6Kn2BNVd0UfoyemTsvNrbE8Xoejp9gRwcf4/tzL3V8RE1qiIiAiIgIiICIiAnLW3f19Tzm7bTqWcv7epkV6gO8M4PWHYH4QLVaRaeuWMsDytItPXJGSB5Wi09ckZIE0PBfrTtTdrtrrNKeCjnoyn2GbpqPc823O3HyHcfZMHG9on+1+Ge6nYjnHp09Q+TKbZ+F747G27jKrFU9MoHGw6z/f3y+bF2ZYBRpxJ+JmOlJmYiFtrdNsO7pAK4SihbKlWuiVGtoFszWJ61DfUl/2zyKvX2YcLTpjD4V2NRCQBlZqZ0FucTlYm+8nyzJNvbAo4zDvhaoIVtQV8JWBurDyg+3UcZhdDk/t/DJ+TYfH0GpDmpUcc9VG4aoxHRa7W4GerjrFaxDNadycksOmG25j8LhgBQNJajIPBR/ojYcB+sfThe3CZL3Q9qPhNnYitRNnAVVYaFc7qhYdBAY2PTafPIrkiuzkqM9Q1sRWOatWa/ONyQBck2uxJJ1Ym54AX3aOCTEU3oVlDJUUqym+oPlG48QRqDrwnZmNuR2a95W7Qrpg9nbPo4nPiMX3tDWF7lLLdwV3AlkGbiFbyyiwGzKmzNp4fAJinrUsTTdmSobsrKrkOBewuyaHiMwO68yXk53OcJga4xNNqjsoITvjKwS9wSoVRc2JGvTLjQ5J0lxz7RZmaoyhFVjmVDYqzKTqLrYW3C7dOieWYmCN92I91DDZMKhP/AJk6/BcTZmxPF6HoqfYEwDuvkLhKK8WxCW9SVGJ+emZ/sYEYegDvFNAf5FjFSK11BadyroiJaiREQEREBERAREQE1B3RORNXvzYrDUy6VCWZFGZlc+Eco1Kk63G653aX2/EDluphmU5WUg9BBBkd4PR7jOpYgcs94PRJFA9HuM6kkwOW/wAmP+U+wz57yeidTSIHLi0t4I0IseqXzZHKevhECNTWsiiyNnyuqjgRY3AFhuG7eZ0PEhalbxqYdiZjs0SnLo51c4JyBuHfF/DL3h+6qKahRs1/tk/BNtxI1w0r2h2bzPdqj/q3/tr/AGyfgn0O6yf4ZU+1X8E2rEnyw5uWqT3WTx2ZU+1X8Ej/AKtf7a/2qfgm14jlg3LVA7rJ/hlT7VfwSG7rTHRNmOW4A1gPghm2Ijlg3LUOC2RjdtYmniMdT71h6d8tOzBcpILBc2rM1gC2gAHkAO3pMSThERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQERED//2Q=="
    },
    {
      name:"oneplus 10R",
      category:"Mobile",
      description:"This is excellent device",
      image:"https://www.giztop.com/media/catalog/product/cache/dc206057cdd42d7e34b9d36e347785ca/o/n/oneplus_10_pro_white_edition.jpg"
    }
  ]
  res.render('admin/view-products',{admin:true,products})
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true})
})

router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)
})


module.exports = router;

