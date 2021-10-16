const rewire = require("rewire")
const swagger = rewire("./swagger")
const toPinyin = swagger.__get__("toPinyin")
const fixHttpEntity = swagger.__get__("fixHttpEntity")
const fixBeanMap = swagger.__get__("fixBeanMap")
const findAllBean = swagger.__get__("findAllBean")
const recursiveAllBean = swagger.__get__("recursiveAllBean")
const fixParamsToBean = swagger.__get__("fixParamsToBean")
const fixResponsesToBean = swagger.__get__("fixResponsesToBean")
const fixBean = swagger.__get__("fixBean")
const fixType = swagger.__get__("fixType")
const fixFormat = swagger.__get__("fixFormat")
const getSchema = swagger.__get__("getSchema")
const getSchemaRef = swagger.__get__("getSchemaRef")
const getSchemaKey = swagger.__get__("getSchemaKey")
const getSchemaType = swagger.__get__("getSchemaType")
const getSchemaTitle = swagger.__get__("getSchemaTitle")
const isMergeSchema = swagger.__get__("isMergeSchema")
const createMergeSchema = swagger.__get__("createMergeSchema")
const emptyBean = swagger.__get__("emptyBean")
// @ponicode
describe("swagger.default.fixSwaggerJson", () => {
    test("0", () => {
        let object = [["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], ["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], "C:\\\\path\\to\\file.ext"]
        let callFunction = () => {
            swagger.default.fixSwaggerJson({ info: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", definitions: [true, false, true], host: "smtp-relay.sendinblue.com", basePath: "/tmp/payment_invoice.ogg.cmc", schemes: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", paths: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], "C:\\\\path\\to\\file.ext", "C:\\\\path\\to\\folder\\"]
        let callFunction = () => {
            swagger.default.fixSwaggerJson({ info: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", definitions: [true, false, true], host: "smtp.gmail.com", basePath: "/tmp/payment_invoice.ogg.cmc", schemes: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", paths: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], ["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], "./path/to/file"]
        let callFunction = () => {
            swagger.default.fixSwaggerJson({ info: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", definitions: [false, true, true], host: "smtp.gmail.com", basePath: "/usr/sbin/tan_district.geo.qxt", schemes: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", paths: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], ["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], "./path/to/file"]
        let callFunction = () => {
            swagger.default.fixSwaggerJson({ info: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", definitions: [false, false, true], host: "smtp.gmail.com", basePath: "/net/panel.dvi.crd", schemes: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", paths: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = ["/path/to/file", ["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"], ["path/to/file.ext", "C:\\\\path\\to\\file.ext", "path/to/folder/", "C:\\\\path\\to\\folder\\", "/path/to/file", ".", "./path/to/file"]]
        let callFunction = () => {
            swagger.default.fixSwaggerJson({ info: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", definitions: [false, false, true], host: "smtp-relay.sendinblue.com", basePath: "/var/up_pink.stl.atx", schemes: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", paths: object })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            swagger.default.fixSwaggerJson(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("toPinyin", () => {
    test("0", () => {
        let callFunction = () => {
            toPinyin("This is a Text")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            toPinyin("Foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            toPinyin("Hello, world!")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            toPinyin("foo bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            toPinyin(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixHttpEntity", () => {
    test("0", () => {
        let callFunction = () => {
            fixHttpEntity({ tagPinyin: "La Plata Dolphin", tag: "Michael", name: "George", namePinyin: "Maggio, Hermiston and Schowalter", paramSubBeans: ["1.0.0", "1.0.0", "v4.0.0-rc.4"], paramBean: "2017-03-01", responseBean: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", responseSubBeans: ["v1.2.4", "4.0.0-beta1\t", "^5.0.0"] }, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixHttpEntity({ tagPinyin: "Long-finned Pilot Whale", tag: "Jean-Philippe", name: "George", namePinyin: "Facebook, Inc.", paramSubBeans: ["^5.0.0", "^5.0.0", "v4.0.0-rc.4"], paramBean: "2019-10-01-preview", responseBean: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", responseSubBeans: ["v4.0.0-rc.4", "v1.2.4", "^5.0.0"] }, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixHttpEntity({ tagPinyin: "False Killer Whale", tag: "Jean-Philippe", name: "Michael", namePinyin: "Facebook, Inc.", paramSubBeans: ["1.0.0", "v4.0.0-rc.4", "v1.2.4"], paramBean: "2019-10-01-preview", responseBean: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", responseSubBeans: ["v4.0.0-rc.4", "1.0.0", "^5.0.0"] }, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixHttpEntity({ tagPinyin: "False Killer Whale", tag: "Michael", name: "Jean-Philippe", namePinyin: "Maggio, Hermiston and Schowalter", paramSubBeans: ["v4.0.0-rc.4", "v1.2.4", "v4.0.0-rc.4"], paramBean: "2020-06-01", responseBean: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", responseSubBeans: ["^5.0.0", "1.0.0", "4.0.0-beta1\t"] }, false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixHttpEntity({ tagPinyin: "Sei Whale", tag: "Michael", name: "Pierre Edouard", namePinyin: "Microsoft Corporation", paramSubBeans: ["v4.0.0-rc.4", "^5.0.0", "4.0.0-beta1\t"], paramBean: "2019-07-01", responseBean: "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E", responseSubBeans: ["v1.2.4", "v1.2.4", "v1.2.4"] }, true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixHttpEntity(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixBeanMap", () => {
    test("0", () => {
        let callFunction = () => {
            fixBeanMap(false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixBeanMap(true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixBeanMap(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("findAllBean", () => {
    test("0", () => {
        let callFunction = () => {
            findAllBean("v1.2.4", false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            findAllBean("v4.0.0-rc.4", false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            findAllBean("^5.0.0", true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            findAllBean("^5.0.0", false)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            findAllBean("4.0.0-beta1\t", true)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            findAllBean(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("recursiveAllBean", () => {
    test("0", () => {
        let object = [["Edmond", "Pierre Edouard", "Anas"], ["Pierre Edouard", "Jean-Philippe", "George"], ["Jean-Philippe", "Jean-Philippe", "Anas"]]
        let param3 = [["v4.0.0-rc.4", "v4.0.0-rc.4", "v4.0.0-rc.4"], ["^5.0.0", "1.0.0", "1.0.0"], ["v1.2.4", "v4.0.0-rc.4", "4.0.0-beta1\t"]]
        let callFunction = () => {
            recursiveAllBean({ props: object }, ["v4.0.0-rc.4", "4.0.0-beta1\t", "4.0.0-beta1\t"], param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let object = [["Anas", "Jean-Philippe", "Jean-Philippe"], ["Michael", "George", "Jean-Philippe"], ["Michael", "Jean-Philippe", "George"]]
        let param3 = [["1.0.0", "1.0.0", "v1.2.4"], ["^5.0.0", "v4.0.0-rc.4", "^5.0.0"], ["1.0.0", "4.0.0-beta1\t", "^5.0.0"]]
        let callFunction = () => {
            recursiveAllBean({ props: object }, ["1.0.0", "v1.2.4", "4.0.0-beta1\t"], param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let object = [["Jean-Philippe", "Anas", "Edmond"], ["George", "Pierre Edouard", "Jean-Philippe"], ["George", "Jean-Philippe", "George"]]
        let param3 = [["v4.0.0-rc.4", "v4.0.0-rc.4", "v4.0.0-rc.4"], ["4.0.0-beta1\t", "v4.0.0-rc.4", "^5.0.0"], ["v4.0.0-rc.4", "^5.0.0", "v1.2.4"]]
        let callFunction = () => {
            recursiveAllBean({ props: object }, ["^5.0.0", "v1.2.4", "v1.2.4"], param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let object = [["George", "Pierre Edouard", "Edmond"], ["George", "Michael", "Edmond"], ["Anas", "Jean-Philippe", "Michael"]]
        let param3 = [["^5.0.0", "v4.0.0-rc.4", "v1.2.4"], ["4.0.0-beta1\t", "v1.2.4", "4.0.0-beta1\t"], ["v4.0.0-rc.4", "v4.0.0-rc.4", "v4.0.0-rc.4"]]
        let callFunction = () => {
            recursiveAllBean({ props: object }, ["v1.2.4", "1.0.0", "v1.2.4"], param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let object = [["Pierre Edouard", "George", "Anas"], ["Anas", "Pierre Edouard", "Pierre Edouard"], ["Anas", "George", "Anas"]]
        let param3 = [["1.0.0", "1.0.0", "1.0.0"], ["^5.0.0", "v4.0.0-rc.4", "4.0.0-beta1\t"], ["4.0.0-beta1\t", "4.0.0-beta1\t", "^5.0.0"]]
        let callFunction = () => {
            recursiveAllBean({ props: object }, ["^5.0.0", "^5.0.0", "^5.0.0"], param3)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            recursiveAllBean(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixParamsToBean", () => {
    test("0", () => {
        let callFunction = () => {
            fixParamsToBean(["Jean-Philippe", "George", "Jean-Philippe"], ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixParamsToBean(["George", "Anas", "Pierre Edouard"], ["The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixParamsToBean(["Jean-Philippe", "Pierre Edouard", "Jean-Philippe"], ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixParamsToBean(["Edmond", "Edmond", "George"], ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixParamsToBean(["Jean-Philippe", "George", "Jean-Philippe"], ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixParamsToBean(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixResponsesToBean", () => {
    test("0", () => {
        let callFunction = () => {
            fixResponsesToBean(["deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125", "invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668", "invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668"], true, { beanMap: true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixResponsesToBean(["invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668", "deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125", "deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125"], true, { beanMap: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixResponsesToBean(["payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447", "invoice transaction at Larkin Inc using card ending with ***8987 for GHS 889.84 in account ***54986018", "deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125"], false, { beanMap: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixResponsesToBean(["deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125", "payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447", "withdrawal transaction at Kovacek Inc using card ending with ***6291 for IRR 718.83 in account ***77705372"], true, { beanMap: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixResponsesToBean(["payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447", "payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447", "deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125"], true, { beanMap: false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixResponsesToBean(undefined, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("swagger.default.findHttpEntity", () => {
    test("0", () => {
        let param1 = [[-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5], [-1, 0.5, 1, 2, 3, 4, 5]]
        let callFunction = () => {
            swagger.default.findHttpEntity(param1, 0.0)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param1 = [["a", "b", "043", "holasenior"], [-1, 0.5, 1, 2, 3, 4, 5], [10, -45.9, 103.5, 0.955674]]
        let callFunction = () => {
            swagger.default.findHttpEntity(param1, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param1 = [[-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "holasenior"], ["foo bar", -0.353, "**text**", 4653]]
        let callFunction = () => {
            swagger.default.findHttpEntity(param1, 12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param1 = [[10, -45.9, 103.5, 0.955674], [-1, 0.5, 1, 2, 3, 4, 5], ["a", "b", "043", "holasenior"]]
        let callFunction = () => {
            swagger.default.findHttpEntity(param1, -10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param1 = [["a", "b", "043", "holasenior"], ["foo bar", -0.353, "**text**", 4653], [-1, 0.5, 1, 2, 3, 4, 5]]
        let callFunction = () => {
            swagger.default.findHttpEntity(param1, "bar")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            swagger.default.findHttpEntity([], Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixBean", () => {
    test("0", () => {
        let callFunction = () => {
            fixBean({ constraint: "Producer", minLength: "Foo bar", maxLength: 675966051848003956, pattern: "(file format) ([a-zA-Z0-9_\\-]+)", type: "object", format: "2017-09-29T23:01:00.000Z", hasRef: true, schemaKey: "DELETE FROM Projects WHERE pid = %s" }, { constraint: "Manager", minLength: -10, maxLength: "6767-0660-5154-5695-946", pattern: 0, enum: "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';" }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixBean({ constraint: "Developer", minLength: "Hello, world!", maxLength: 6709431991929328, pattern: "(definition-(checksum|signature)\\s[\\w=\\/+]+)", type: "object", format: "2017-09-29T23:01:00.000Z", hasRef: true, schemaKey: "DROP TABLE tmp;" }, { constraint: "Producer", minLength: "bar", maxLength: 1, pattern: 1, enum: "UPDATE Projects SET pname = %s WHERE pid = %s" }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixBean({ constraint: "Architect", minLength: "This is a Text", maxLength: 675966051848003956, pattern: "(?i)(?L)(?m)(?s)(?u)(?#)", type: "object", format: "Mon Aug 03 12:45:00", hasRef: true, schemaKey: "DELETE FROM Projects WHERE pid = %s" }, { constraint: "Architect", minLength: -1, maxLength: 0.0, pattern: -1, enum: "UNLOCK TABLES;" }, ["The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixBean({ constraint: "Producer", minLength: "foo bar", maxLength: 675966051848003956, pattern: "(?:non-capturing)", type: "object", format: "01:04:03", hasRef: true, schemaKey: "UPDATE Projects SET pname = %s WHERE pid = %s" }, { constraint: "Manager", minLength: 0, maxLength: 1, pattern: 0, enum: "SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';" }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixBean({ constraint: "Manager", minLength: "This is a Text", maxLength: "3432-903341-73690", pattern: "min\\s+\\d+\\s+of", type: "number", format: "2017-09-29T19:01:00.000", hasRef: false, schemaKey: "DROP TABLE tmp;" }, { constraint: "Producer", minLength: "bar", maxLength: 1, pattern: "(?P<first_group_name>.*)-(?P=first_group_name)", enum: "DELETE FROM Projects WHERE pid = %s" }, ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixBean({ constraint: "", minLength: "", maxLength: "", pattern: "", type: "", format: "", hasRef: false, schemaKey: "" }, undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixType", () => {
    test("0", () => {
        let callFunction = () => {
            fixType({ type: "array", items: { type: 10 }, schema: { type: "string" } }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixType({ type: "string", items: { type: "string" }, schema: { type: "object" } }, ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixType({ type: "array", items: { type: 10 }, schema: { type: "number" } }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixType({ type: "array", items: { type: "string" }, schema: { type: "string" } }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixType({ type: "number", items: { type: "object" }, schema: { type: "string" } }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixType(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("fixFormat", () => {
    test("0", () => {
        let callFunction = () => {
            fixFormat({ format: "2017-09-29T23:01:00.000Z" }, ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            fixFormat({ format: "2017-09-29T19:01:00.000" }, ["The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            fixFormat({ format: "2017-09-29T19:01:00.000" }, ["Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            fixFormat({ format: "Mon Aug 03 12:45:00" }, ["The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            fixFormat({ format: "2017-09-29T19:01:00.000" }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            fixFormat(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSchema", () => {
    test("0", () => {
        let param2 = [[true, false, true], [true, false, false], [true, false, true]]
        let callFunction = () => {
            getSchema("payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [[false, true, true], [true, true, false], [true, false, true]]
        let callFunction = () => {
            getSchema("withdrawal transaction at Kovacek Inc using card ending with ***6291 for IRR 718.83 in account ***77705372", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [[false, true, true], [false, false, true], [false, true, false]]
        let callFunction = () => {
            getSchema("invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2 = [[true, true, true], [true, false, true], [true, false, false]]
        let callFunction = () => {
            getSchema("invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [[true, false, true], [false, false, false], [true, true, true]]
        let callFunction = () => {
            getSchema("deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getSchema(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSchemaRef", () => {
    test("0", () => {
        let callFunction = () => {
            getSchemaRef("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getSchemaRef(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSchemaKey", () => {
    test("0", () => {
        let callFunction = () => {
            getSchemaKey("withdrawal transaction at Kovacek Inc using card ending with ***6291 for IRR 718.83 in account ***77705372")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getSchemaKey("invoice transaction at O'Connell, Beahan and Gerhold using card ending with ***6715 for ARS 840.46 in account ***86953668")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getSchemaKey("payment transaction at Satterfield - Hyatt using card ending with ***0494 for GHS 370.23 in account ***63108447")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getSchemaKey("invoice transaction at Larkin Inc using card ending with ***8987 for GHS 889.84 in account ***54986018")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getSchemaKey("deposit transaction at Streich, Mann and Rutherford using card ending with ***5156 for TJS 69.36 in account ***97846125")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getSchemaKey(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSchemaType", () => {
    test("0", () => {
        let param2 = [["Jean-Philippe", "Pierre Edouard", "Anas"], ["Michael", "George", "Pierre Edouard"], ["Michael", "George", "Jean-Philippe"]]
        let callFunction = () => {
            getSchemaType("DELETE FROM Projects WHERE pid = %s", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [["Jean-Philippe", "Michael", "Jean-Philippe"], ["Jean-Philippe", "George", "Jean-Philippe"], ["Anas", "Jean-Philippe", "Edmond"]]
        let callFunction = () => {
            getSchemaType("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [["Anas", "Michael", "Jean-Philippe"], ["Pierre Edouard", "Michael", "Michael"], ["Pierre Edouard", "Jean-Philippe", "Jean-Philippe"]]
        let callFunction = () => {
            getSchemaType("UNLOCK TABLES;", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2 = [["Edmond", "George", "Jean-Philippe"], ["Edmond", "Pierre Edouard", "Jean-Philippe"], ["Michael", "George", "Pierre Edouard"]]
        let callFunction = () => {
            getSchemaType("DELETE FROM Projects WHERE pid = %s", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [["Edmond", "Michael", "Anas"], ["Pierre Edouard", "Edmond", "George"], ["Anas", "Jean-Philippe", "Michael"]]
        let callFunction = () => {
            getSchemaType("DROP TABLE tmp;", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getSchemaType(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getSchemaTitle", () => {
    test("0", () => {
        let param2 = [[false, true, true], [false, false, true], [false, true, false]]
        let callFunction = () => {
            getSchemaTitle("DROP TABLE tmp;", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let param2 = [[false, true, false], [false, false, false], [true, true, true]]
        let callFunction = () => {
            getSchemaTitle("DELETE FROM Projects WHERE pid = %s", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let param2 = [[true, false, true], [true, false, false], [false, false, true]]
        let callFunction = () => {
            getSchemaTitle("SELECT * FROM Movies WHERE Title=’Jurassic Park’ AND Director='Steven Spielberg';", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let param2 = [[true, false, true], [false, false, true], [false, false, true]]
        let callFunction = () => {
            getSchemaTitle("UPDATE Projects SET pname = %s WHERE pid = %s", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let param2 = [[true, false, true], [true, false, false], [false, true, false]]
        let callFunction = () => {
            getSchemaTitle("UNLOCK TABLES;", param2)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getSchemaTitle(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isMergeSchema", () => {
    test("0", () => {
        let callFunction = () => {
            isMergeSchema("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22undefined%22%20height%3D%22undefined%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22NaN%22%20y%3D%22NaN%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3Eundefinedxundefined%3C%2Ftext%3E%3C%2Fsvg%3E")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            isMergeSchema(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("createMergeSchema", () => {
    test("0", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: "a1969970175" }, description: "Looking for collector with description " }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "Boston's most advanced compression wear technology increases muscle oxygenation, stabilizes active muscles", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: 56784 }, description: "Print Base" }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: 12345 }, description: "Description: " }, ["New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: "a1969970175" }, description: "Description: " }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality", "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: 987650 }, description: "Looking for collector with description " }, ["The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design", "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart", "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            createMergeSchema({ schema: { allOf: NaN }, description: "" }, [])
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("emptyBean", () => {
    test("0", () => {
        let callFunction = () => {
            emptyBean()
        }
    
        expect(callFunction).not.toThrow()
    })
})
