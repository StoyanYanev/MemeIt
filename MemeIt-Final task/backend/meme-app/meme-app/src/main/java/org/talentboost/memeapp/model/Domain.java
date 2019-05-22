package org.talentboost.memeapp.model;

public class Domain {

    private String id;
    private String name;
    private String address;

    public Domain() {
    }

    public Domain(String id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public String getAddress() {
        return this.address;
    }
}
