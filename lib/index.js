"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorage = void 0;
var react_1 = require("react");
function useLocalStorage(config) {
    var _a = react_1.useState(null), storageData = _a[0], setStorageData = _a[1];
    var handleSetData = react_1.useCallback(function (data) {
        for (var _i = 0, _a = Object.entries(data ? data : {}); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value) {
                localStorage.setItem(config.baseName + "/" + key, JSON.stringify(value));
            }
        }
    }, [config.baseName]);
    var handleGetData = react_1.useCallback(function () {
        var _a;
        var newData = {};
        for (var _i = 0, _b = Object.entries(config.initialData); _i < _b.length; _i++) {
            var key = _b[_i][0];
            var item = localStorage.getItem(config.baseName + "/" + key);
            newData = __assign(__assign({}, newData), (_a = {}, _a[key] = item && JSON.parse(item), _a));
        }
        if (newData.constructor === Object && Object.keys(newData).length !== 0) {
            setStorageData(newData);
        }
        else {
            setStorageData(null);
        }
    }, [config.initialData, config.baseName]);
    var handleSetItem = react_1.useCallback(function (key, data) {
        localStorage.setItem(config.baseName + "/" + key, JSON.stringify(data));
        handleGetData();
    }, [config.baseName, handleGetData]);
    var handleRemoveItem = react_1.useCallback(function (key) {
        localStorage.removeItem(config.baseName + "/" + key);
        handleGetData();
    }, [config.baseName, handleGetData]);
    var handleClearStorage = react_1.useCallback(function () {
        localStorage.clear();
        handleGetData();
    }, [handleGetData]);
    react_1.useEffect(function () {
        handleGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    react_1.useEffect(function () {
        handleSetData(storageData);
    }, [storageData, handleSetData]);
    return {
        data: storageData,
        setData: setStorageData,
        setItem: handleSetItem,
        removeItem: handleRemoveItem,
        clearStorage: handleClearStorage,
    };
}
exports.useLocalStorage = useLocalStorage;
