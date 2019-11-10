---
marp: true
paginate: true
style: |
  h1 {
    color: #0bb8e8;
  }
---

<style scoped>
h1,h2 {
	color: #0bb8e8;
	text-align: center
}
h2 {
	text-align: right
}

</style>

# Node.js 进阶

# 箭头函数 vs 匿名函数

## :star: by calidion

---

# 定义与形式

1. 箭头函数

```
() => {
}
() => a

```

2. 匿名函数

```
funciton () {
}

```

---

# 语法上的 this 与 anguments

1. 在箭头函数里没有自己的 this 和 arguments

```
let a = {
    foo: 42,
    bar: () => {
    console.log(this);
    console.log(arguments);
    //  console.log('Inside `bar`:', this.foo);
    console.log('Inside `bar`:', a.foo);
    },
  }
```

---

2. 在匿名函数里有

```
let a = {
    foo: 42,
    bar: function() {
      console.log(this);
      console.log(arguments);
      console.log('Inside `bar`:', this.foo);
    },
  }
```

---

# 箭头函数无法 new

1. 箭头函数无法 new

```
> new (() => {});
TypeError: (intermediate value) is not a constructor
> var x = () => {};
> new x();
TypeError: x is not a constructor
```

2. 匿名函数可以

```
> new (function() {});
{}
> let f = function() {};
> new f();
f {}
```

---
