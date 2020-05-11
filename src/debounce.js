// 防抖：一段时间内重复提交只执行1次

// 关键思路，如果在wait时间内重复调用，直接clearTimeout(time)，重新创建timer
function _debounce(fn, wait, immediate) {
  let timer;
  return function debounced(...args) {
    const context = this;
    let callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, wait)

    if (callNow) {
      fn.apply(context, args);
    }
  }
}

const debounced = _debounce(print, 1000, true);


// debounce装饰器

function debounce1(wait, immediate) {
  return function handleDescriptor(target, key, descriptor) {
    const func = descriptor.value;
    var fn = _debounce(func, wait, immediate)
    return {
      ...descriptor,
      value() {
        fn()
      }
    };
  }
}
// 改进后的形式
function debounce2(wait, immediate) {
  return function handleDescriptor(target, key, descriptor) {
    const func = descriptor.value;
    var fn = _debounce(func, wait, immediate)
    descriptor.value = function() {
      fn();
    }
    return descriptor;
  }
}

class Person {
  @debounce2(1000, true)
  print() {
    console.log('print')
  }
}

let p1 = new Person();



// 保证一段时间只执行一次，
// 通过判断是否达到时间来触发
function throttle(fn, wait) {
  let timer;
  return function throttled(...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        // 调用后，定时清理timer
        timer = null;
      }, wait)
    }
  }
}

throttled = throttle(print, 1000);

window.addEventListener('resize', p1.print);



