Gun.chain.live = function(cb, opt){
  return this.on(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.value = function(cb, opt){
  return this.val(function(val, field){
    delete val._;
    cb.call(this, val, field);
  }, opt);
}

Gun.chain.image = function (img) {
  if (!img.src) {
    return this.val(function (src) {
      img.src = src
    });
  }
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var data = canvas.toDataURL();
  return this.put(data);
}

Gun.create = function () {
  return Gun.apply(this, arguments);
};

Gun.chain.local = function (data, cb, opt) {
  opt = opt || { };
  opt.peers = { };
  return this.put(data, cb, opt)
}

Gun.chain.each = function () {
  var each = this.map();
  return this.val.apply(each, arguments)
}

Gun.chain.date = function (data) {
  if (Gun.fns.is(data)) {
    return this.val(function (val) {
      data.call(this, new Date(val));
    }
  }
  return this.put(data.getTime());
};

Gun.chain.count = function (num) {
  if (typeof num === 'number') {
    this.path(Gun.text.random()).put(num);
  }
  if (typeof num === 'function') {
    var sum = 0;
    this.map().val(function (val) {
      num(sum += val);
    });
  }
  return this;
};
