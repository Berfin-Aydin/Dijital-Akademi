package com.dijitalAkademi.ws.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;

@Data // get ve set'leri oluşturacak
@MappedSuperclass //Diğer class'lardan extens edilebilir
public class BaseEntity implements Serializable {

    @Column(name = "create_at")
    private Date createAt;

    @Column(name = "create_by", length = 100)
    private String createBy;

    @Column(name = "update_at")
    private Date updateAt;

    @Column(name = "update_bt", length = 100)
    private String updateBy;

    @Column(name = "status")
    private Boolean status;
}
